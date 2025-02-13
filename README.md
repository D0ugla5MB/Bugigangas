# Web Bugigangas

**Version**: 3.2.0

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
- v2.0.1
  - Improved event management system:
    - Added default route handling in `manageEvents`
    - Enhanced route cleanup for unmatched paths
    - Fixed event listener cleanup for route changes
  - Code quality improvements:
    - Added defensive programming for undefined routes
    - Improved type safety in event tracking
- v2.0.2
  - Enhanced ClickPaint app functionality:
    - Fixed double-click event delegation on counter element
    - Improved draggable counter element behavior
    - Fixed popup dialog timeouts
    - Removed duplicate event listeners
    - Better scope management for drag state variables
- v3.0.0
  - Major refactoring of ClickPaint element initialization:
    - Created initElements function to centralize element creation
    - Added error handling for element initialization
    - Simplified element creation and appending flow
  
  - Code organization improvements:
    - Consolidated element creation in builder.js
    - Moved appending logic to dedicated function
    - Added try/catch blocks for DOM operations
    - Better state handling for counters and popups
    - More maintainable element creation structure
    - Reduced code duplication
- v3.0.1
  - Removed `console.log` at [`ClickPaint/events.js`](scripts/apps/click-paint/events.js)
  - Removed dup event handler at [`home/events.js`](scripts/apps/home/events.js)
  - Refactored the missed artifacts
- v3.1.0
  - Back button implementation using builder pattern [`builder.js`](scripts/apps/click-paint/builder.js)
  - Animated button reveal effects [`home.css`](styles/apps/home.css)  
  - Consistent button styling across components [`main.css`](styles/main.css)
  - Responsive layout with flexbox [`home.css`](styles/apps/home.css)
  - Header hover animations [`home.css`](styles/apps/home.css)
- v3.2.0
   **Values Configuration:**
  - The [`values.js`](scripts/apps/wordseek/values.js) file defines constants for WordSeek, including grid elements, direction equations, [`API`](https://www.datamuse.com/api/) to fetch the data, and game mode settings.
   **Utility Functions:**
  - The [`utils.js`](scripts/apps/wordseek/utils.js) file provides helper functions for the WordSeek app such as generating random letters, directions, and arrow equations, as well as handling word selection.
   **Empty/Placeholder Files:**
  - Files like [`builder.js`](scripts/apps/wordseek/builder.js), [`events.js`](scripts/apps/wordseek/events.js), [`index.js`](scripts/apps/wordseek/index.js), and [`wordseek.js`](scripts/apps/wordseek/wordseek.js) are currently empty and likely await further implementation.
