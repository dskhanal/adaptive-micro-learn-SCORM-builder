<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function current_revision(string $raw): string
{
    return hash('sha256', $raw);
}

function read_project(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }

    $raw = file_get_contents($path);
    if ($raw === false) {
        respond(500, ['error' => 'The shared project could not be read.']);
    }

    try {
        $project = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        respond(500, ['error' => 'The shared project file contains invalid JSON.']);
    }

    if (!is_array($project)) {
        respond(500, ['error' => 'The shared project file is not a project object.']);
    }

    return ['project' => $project, 'revision' => current_revision($raw), 'updatedAt' => gmdate(DATE_ATOM, (int) filemtime($path))];
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    respond(503, ['error' => 'Shared project storage is not configured.']);
}

$config = require $configFile;
$configuredKey = is_array($config) ? (string) ($config['access_key'] ?? '') : '';
if ($configuredKey === '' || str_starts_with($configuredKey, 'CHANGE_THIS_')) {
    respond(503, ['error' => 'Set a private shared-project access key in api/config.php before using shared storage.']);
}

$providedKey = (string) ($_SERVER['HTTP_X_PROJECT_KEY'] ?? '');
if ($providedKey === '' || !hash_equals($configuredKey, $providedKey)) {
    header('WWW-Authenticate: Bearer realm="Adaptive SCORM Studio"');
    respond(401, ['error' => 'The shared-project access key is not valid.']);
}

$method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
$projectFile = (string) ($config['project_file'] ?? (__DIR__ . '/data/project.json'));
$maxBytes = max(1024, (int) ($config['max_bytes'] ?? (64 * 1024 * 1024)));

if ($method === 'GET') {
    $stored = read_project($projectFile);
    respond(200, $stored ?? ['project' => null, 'revision' => null, 'updatedAt' => null]);
}

if ($method !== 'PUT') {
    header('Allow: GET, PUT');
    respond(405, ['error' => 'Only GET and PUT are supported.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > $maxBytes) {
    respond(413, ['error' => 'The project is larger than the configured server limit.']);
}

$requestBody = file_get_contents('php://input');
if ($requestBody === false || $requestBody === '' || strlen($requestBody) > $maxBytes) {
    respond(400, ['error' => 'A project JSON body is required.']);
}

try {
    $payload = json_decode($requestBody, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['error' => 'The request body contains invalid JSON.']);
}

$project = is_array($payload) ? ($payload['project'] ?? null) : null;
$baseRevision = is_array($payload) && is_string($payload['revision'] ?? null) ? $payload['revision'] : null;
if (!is_array($project)) {
    respond(422, ['error' => 'The request does not contain a project object.']);
}

foreach (['editorVersion', 'version', 'code', 'title', 'modules', 'diagnostic', 'final'] as $field) {
    if (!array_key_exists($field, $project)) {
        respond(422, ['error' => "The project is missing the required {$field} field."]);
    }
}
if (!is_array($project['modules']) || !is_array($project['diagnostic']) || !is_array($project['final'])) {
    respond(422, ['error' => 'Modules, diagnostic and final must be arrays.']);
}

$directory = dirname($projectFile);
if (!is_dir($directory) && !mkdir($directory, 0750, true) && !is_dir($directory)) {
    respond(500, ['error' => 'The shared-project data directory could not be created.']);
}

$lock = fopen($projectFile . '.lock', 'c+');
if ($lock === false || !flock($lock, LOCK_EX)) {
    respond(500, ['error' => 'The shared project could not be locked for saving.']);
}

try {
    if (is_file($projectFile)) {
        $existing = file_get_contents($projectFile);
        if ($existing === false) {
            respond(500, ['error' => 'The existing shared project could not be read.']);
        }
        $existingRevision = current_revision($existing);
        if ($baseRevision === null || !hash_equals($existingRevision, $baseRevision)) {
            respond(409, ['error' => 'Another author saved a newer version. Load the shared project before saving again.', 'revision' => $existingRevision]);
        }
    }

    try {
        $encoded = json_encode($project, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR) . PHP_EOL;
    } catch (JsonException) {
        respond(422, ['error' => 'The project contains data that cannot be encoded as JSON.']);
    }

    $temporary = tempnam($directory, 'project-');
    if ($temporary === false || file_put_contents($temporary, $encoded, LOCK_EX) === false) {
        respond(500, ['error' => 'The temporary shared project could not be written.']);
    }
    chmod($temporary, 0640);

    if (is_file($projectFile)) {
        @copy($projectFile, $projectFile . '.backup.json');
    }
    if (!rename($temporary, $projectFile)) {
        @unlink($temporary);
        respond(500, ['error' => 'The shared project could not be moved into place.']);
    }
} finally {
    flock($lock, LOCK_UN);
    fclose($lock);
}

clearstatcache(true, $projectFile);
respond(200, [
    'saved' => true,
    'revision' => current_revision($encoded),
    'updatedAt' => gmdate(DATE_ATOM, (int) filemtime($projectFile)),
]);
