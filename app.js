import { getIndexContainerId } from './modules/storage.js';
import { loadApp, getPathnameHash } from './modules/router.js';
import { cacheTool, eventTrackerTool } from './modules/utils.js';

(
    function () {
        window.eventTracker = eventTrackerTool.initEventTracker();
        
        document.addEventListener('DOMContentLoaded', function () {
            window.addEventListener('hashchange', () => {
                const hash = getPathnameHash();
                eventTrackerTool.manageEvents(window.eventTracker, hash);
                loadApp(getIndexContainerId, hash);
            });
            const initialHash = getPathnameHash();
            loadApp(getIndexContainerId, initialHash);
        });
    }
)();
