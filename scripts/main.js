import { DOM, ENV_VAR } from './utils/constants.js';
import router from './router.js';
import eventTrackerTool from './events.js';
import { loadApp } from './loaders.js';

function showConsoleMsg() {
    if (window.location.pathname.toString() === ENV_VAR) {
        console.warn('You are in the production environment');
    }

    console.warn('The current debugger tool will be substituted by the browser console while a new one is being developed');
}

(function init() {

    //CAUTION TO USE IT AT PRODUCTION ENVIRONMENT
    showConsoleMsg();

    window.eventTracker = eventTrackerTool.initEventTracker();

    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('hashchange', () => {
            const hash = router.getPathnameHash();
            eventTrackerTool.manageEvents(window.eventTracker, hash);
            loadApp(DOM.indexContainerId, hash);
        });
        const initialHash = router.getPathnameHash();
        loadApp(DOM.indexContainerId, initialHash);
    });
})();
