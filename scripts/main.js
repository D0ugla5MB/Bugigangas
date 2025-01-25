import { DOM, ENV_VAR } from './utils/constants.js';
import { loadApp, getPathnameHash } from './router.js';
import eventTracker from './events.js';


function showConsoleMsg() {
    if (window.location.pathname.toString() === ENV_VAR) {
        console.warn('You are in the production environment');
    }

    console.warn('The current debugger tool will be substituted by the browser console while a new one is being developed');
}

(function init() {

    //CAUTION TO USE IT AT PRODUCTION ENVIRONMENT
    showConsoleMsg();

    window.eventTracker = eventTracker.initEventTracker();

    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('hashchange', () => {
            const hash = getPathnameHash();
            eventTracker.manageEvents(window.eventTracker, hash);
            loadApp(DOM.indexContainerId, hash);
        });
        const initialHash = getPathnameHash();
        loadApp(DOM.indexContainerId, initialHash);
    });
})();
