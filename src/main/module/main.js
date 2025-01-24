import { DOM, ENV_VAR } from './utils/constants.js';
import { eventTrackerTool } from './utils/utils.js';
import { loadApp, getPathnameHash } from './router.js';
import { REQ_KEYS } from './tools/constants.js';


(function init() {

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
