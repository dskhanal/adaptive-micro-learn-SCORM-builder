<?php
declare(strict_types=1);

// Prefer setting ADAPTIVE_SCORM_ACCESS_KEY in the hosting environment. If that
// is unavailable, replace the placeholder below before uploading this file.
return [
    'access_key' => getenv('ADAPTIVE_SCORM_ACCESS_KEY') ?: 'CHANGE_THIS_TO_A_LONG_RANDOM_ACCESS_KEY',
    'project_file' => getenv('ADAPTIVE_SCORM_PROJECT_FILE') ?: __DIR__ . '/data/project.json',
    'max_bytes' => 64 * 1024 * 1024,
];
