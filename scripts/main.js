import { DOM } from './utils/constants.js';
import { eventTrackerTool } from './utils/utils.js';
import { loadApp, getPathnameHash } from './router.js';
import { debugUtils } from '../dev-tools/debbug-utils.mjs';

(function init() {
    
    //CAUTION TO USE IT AT PRODUCTION ENVIRONMENT
    if (document.baseURI.includes('main')) {
        debugUtils.enable();
        window.debugUtils = debugUtils;
    }

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
