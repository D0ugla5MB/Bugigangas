import * as Modules from './index.js';

function showConsoleMsg() {
    if (window.location.pathname.toString() === Modules.Utils.constants.ENV_VAR) {
        console.warn('You are in the production environment');
    }

    console.warn('The current debugger tool will be substituted by the browser console while a new one is being developed');
}

(function init() {

    //CAUTION TO USE IT AT PRODUCTION ENVIRONMENT
    showConsoleMsg();

    window.eventTracker = Modules.Core.events.initEventTracker();

    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('hashchange', () => {
            const hash = Modules.Core.router.getPathnameHash();
            Modules.Core.events.manageEvents(window.eventTracker, hash);
            Modules.Core.loader.loadApp(Modules.Utils.constants.DOM.indexContainerId, hash);
        });
        const initialHash = Modules.Core.router.getPathnameHash();
        Modules.Core.loader.loadApp(Modules.Utils.constants.DOM.indexContainerId, initialHash);
        Modules.Apps.Home.builderHome.backHomeBtn(Modules.Utils.constants.DOM.btnIds.back);
    });
})();
