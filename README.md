# Web Bugigangas

**Version**: 2.0.0

WebBugigangas is a collection of small web applications built with **VanillaJS**.
The project is structured using a modular architecture to maintain scalability and modularity, while keeping the code lightweight and efficient.

## Description

WebBugigangas is designed as a collection of simple web applications made 'out of blue' using plain JavaScript. It aims to serve as a starting point for creating small, maintainable web projects with minimal dependencies.

## Features

- Modular JavaScript architecture using ES6 modules.
- Custom routing system.
- Lightweight and efficient design without relying on third-party libraries.

## Versioning

- v1.0.0 - first stable production version. Versioning started now because the app is fully functional.
- v1.0.1 - updated home.js to replace the switch statement with a button map for event registration.

- v2.0.0 - major update
  - Updated `.gitignore` to include new files and directories.
  - Refactored various parts of the codebase for improved maintainability:
    - `home.js`: Replaced the switch statement with a button map for event registration.
    - `router.js`: Simplified the routing logic for better readability.
    - `core/events.js`: Introduced a new event tracking system using a nested `Map` for better event management.
    - `utils/utils.js`: Removed unused utility functions and optimized existing ones.
    - General: Improved code readability and consistency across the project.
