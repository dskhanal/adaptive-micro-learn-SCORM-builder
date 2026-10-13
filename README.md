# Adaptive Micro-Learn SCORM Builder

> Live demo: https://dskhanal.github.io/adaptive-micro-learn-SCORM-builder/
> Launch the builder directly in the browser and start creating adaptive, micro-learning SCORM 2004 content.

A browser-based authoring studio for creating adaptive, micro-learning SCORM 2004 content. This project gives you a fast way to assemble learning modules, define branch logic, validate the structure, and export learner-ready content.

This builder is designed for educators, instructional designers, and developers who want to create compact, learner-responsive training experiences without building a full custom LMS tool from scratch.

## What this project includes

- A front-end authoring interface for building adaptive learning content
- Support for modular lesson structure
- Diagnostic and final assessment flows
- SCORM 2004-oriented project authoring and validation
- Shared project storage through a simple PHP API
- Export-ready project data designed for LMS delivery

## Project overview

The repository is intentionally simple and split into a static front-end and a PHP-backed API:

- `index.html` – application shell for the browser-based builder
- `assets/` – compiled CSS and JavaScript for the UI
- `api/config.php` – configuration for shared project storage
- `api/project.php` – API endpoint for loading and saving projects
- `api/data/` – local storage directory for saved project JSON files

## How the builder works

The application loads in the browser and allows you to create or edit a project object made up of:

- project metadata
- learning modules
- diagnostic content
- final assessment content
- validation and preview state

The PHP API is used for shared-project persistence. It validates incoming project data, accepts a JSON payload, and stores it safely in a configured data directory. This makes it possible to collaborate on course design while keeping the authoring experience lightweight.

## Why this is useful

This builder is especially valuable when you need to:

- create short, adaptive learning sequences
- package training content in a portable SCORM format
- test or preview learning logic before uploading to an LMS
- centralize the authoring flow around one simple project structure
- support a lightweight workflow without a large application stack

## Local launch instructions

### Prerequisites

- PHP 8.0 or newer
- A modern browser
- A local web server or PHP-powered hosting environment

### Quick start

From the repository root, run:

```bash
php -S localhost:8000
```

Then open the following URL in your browser:

```text
http://localhost:8000/
```

This serves the app directly from the repository root, which is enough for the front-end UI to load.

### If you want shared project saving

The project API is protected by a secret access key. The file `api/config.php` contains the configuration:

```php
return [
    'access_key' => getenv('ADAPTIVE_SCORM_ACCESS_KEY') ?: 'CHANGE_THIS_TO_A_LONG_RANDOM_ACCESS_KEY',
    'project_file' => getenv('ADAPTIVE_SCORM_PROJECT_FILE') ?: __DIR__ . '/data/project.json',
    'max_bytes' => 64 * 1024 * 1024,
];
```

Before using shared project storage, set a private key in your environment or edit the file directly. Example:

```bash
export ADAPTIVE_SCORM_ACCESS_KEY="your-long-random-secret-key"
```

You can also define a custom project file location:

```bash
export ADAPTIVE_SCORM_PROJECT_FILE="/path/to/your/project.json"
```

Important: the app will not use shared storage safely until the access key is changed from the default placeholder value.

## Production deployment notes

This repository is not a pure GitHub Pages project because the app includes a PHP API (`api/project.php`) and project persistence logic. GitHub Pages can host the static front-end, but it cannot run PHP server-side request handlers or secure persistence logic directly.

For production hosting, use a PHP-capable environment such as:

- Apache with PHP enabled
- Nginx + PHP-FPM
- a managed PHP hosting service
- a VPS or cloud server with PHP installed

Make sure the site root points to the repository directory or to the built front-end output, and that the `api/` directory remains accessible to the web server.

## Recommended launch flow

1. Put the repository on a PHP-enabled server.
2. Ensure PHP is enabled for the domain or web root.
3. Configure the project access key in `api/config.php` or via environment variables.
4. Start the server or deploy to your hosting environment.
5. Open the app in the browser and begin building the course.
6. Save the project, preview the learning flow, and export when ready.

## Typical use case

A common workflow looks like this:

- create a new project
- add training modules with short learning objectives
- define adaptive decision points
- configure diagnostic and final checkpoints
- validate the project structure
- preview the learner path
- export the SCORM package for LMS deployment

## Security and configuration best practices

- never leave the default access key in place
- use a long random string for `ADAPTIVE_SCORM_ACCESS_KEY`
- keep the project JSON file outside the public web root if possible
- restrict API access to trusted environments
- back up the project file regularly

## Summary

The Adaptive Micro-Learn SCORM Builder is a lightweight authoring system for building small, adaptive, SCORM-ready learning experiences. It is built to be easy to run locally, easy to understand, and easy to extend. Use the browser-based app to author content, validate it, and package it for delivery in a learner-friendly format.

If you want to get started quickly, run the app locally with PHP and open the repository in a browser. For production use, configure the secure shared-project key and deploy behind a PHP-capable web server.

## License

This project does not appear to declare a license in the repository root, so check with the repository owner or upstream project documentation before using it in commercial or public distribution.

## Notes for contributors

If you plan to extend this tool, the most likely areas to improve are:

- UI flow and authoring screens
- validation rules and SCORM compliance checks
- export logic and packaging
- project sharing and persistence security
- deployment documentation for specific hosting providers

This repository is a strong base for building a scalable adaptive course authoring system without heavy infrastructure requirements.
