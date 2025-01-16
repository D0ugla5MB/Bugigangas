import { DOM } from './utils/constants.js';
import { eventTrackerTool } from './utils/utils.js';
import { loadApp, getPathnameHash } from './router.js';

(function () {
    window.eventTracker = eventTrackerTool.initEventTracker();
    
    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('hashchange', () => {
            const hash = getPathnameHash();
            eventTrackerTool.manageEvents(window.eventTracker, hash);
            loadApp(DOM.indexContainerId, hash);
        });
        const initialHash = getPathnameHash();
        loadApp(DOM.indexContainerId, initialHash);
    });
})();
