import * as Modules from './index.js';

(function init() {

    //CAUTION TO USE IT AT PRODUCTION ENVIRONMENT
    Modules.Utils.utils.showConsoleMsg();

    window.eventTracker = Modules.Core.events.initEventTracker();

    Modules.Utils.utils.clearSessionStorage();

    document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('hashchange', () => {
            const hash = Modules.Core.router.getPathnameHash();
            Modules.Core.events.manageEvents(window.eventTracker, hash);
            Modules.Core.loader.loadApp(Modules.Utils.constants.DOM.indexContainerId, hash);

            Modules.Apps.Home.builderHome.backHomeBtn(Modules.Utils.constants.DOM.btnIds.back);
            Modules.Apps.Home.homeEvents.changeBtnView(Modules.Utils.constants.DOM.btnIds.back);
        });
        const initialHash = Modules.Core.router.getPathnameHash();
        Modules.Core.loader.loadApp(Modules.Utils.constants.DOM.indexContainerId, initialHash);
        Modules.Apps.Home.builderHome.backHomeBtn(Modules.Utils.constants.DOM.btnIds.back);
    });
})();
