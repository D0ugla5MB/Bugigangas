import { constants } from '../../utils/index.js';
import { router, events } from '../../core/index.js';
import elements from './elements.js';

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(constants.DOM.navMenu);

    if (!index_menu) {
        console.error('Menu element not found');
        return;
    }

    const menuButtonsWithId = document.querySelectorAll(constants.DOM.querySelect);

    //TO-DO: studying the HOME_BUTTONS usage
    menuButtonsWithId.forEach((btn) => {
        switch (btn.id) {
            case constants.DOM.btnIds.nav:
                events.registerEventListener(
                    constants.ROUTES.hashHome,
                    window.eventTracker,
                    btn,
                    'click',
                    () => {
                        document.getElementById(constants.DOM.navMenu).hidden = !document.getElementById(constants.DOM.navMenu).hidden;
                    }
                );
                break;

            case constants.DOM.btnIds.clickPaint:
                events.registerEventListener(
                    constants.ROUTES.hashClickPaint,
                    window.eventTracker,
                    btn,
                    'click',
                    () => { router.changeRoute(constants.ROUTES.hashClickPaint); }
                );
                break;
        }
    });
}
export default { addMenuBtnsEvents, elements };