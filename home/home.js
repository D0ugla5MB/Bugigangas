import { DOM, ROUTES } from "../modules/storage.js";
import { changeRoute } from "../modules/router.js";
import { eventTrackerTool } from '../modules/utils.js';

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(DOM.navMenu);

    if (!index_menu) {
        console.error('Menu element not found');
        return;
    }

    const menuButtonsWithId = document.querySelectorAll(DOM.querySelect);

    menuButtonsWithId.forEach((btn) => {
        switch (btn.id) {
            case DOM.btnIds.nav:
                eventTrackerTool.registerEventListener(
                    ROUTES.hashHome,
                    window.eventTracker,
                    btn,
                    'click',
                    () => {
                        document.getElementById(DOM.navMenu).hidden = !document.getElementById(DOM.navMenu).hidden;
                    }
                );
                break;

            case DOM.btnIds.clickPaint:
                eventTrackerTool.registerEventListener(
                    ROUTES.hashClickPaint,
                    window.eventTracker,
                    btn,
                    'click',
                    () => { changeRoute(ROUTES.hashClickPaint); }
                );
                break;
        }
    });
}
