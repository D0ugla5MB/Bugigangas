import { constants } from '../../utils/index.js';
import { router, events } from '../../core/index.js';
import builderHome from './builder.js';
import buttons from './events.js';

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(constants.DOM.navMenu);

    if (!index_menu) {
        console.error('Menu element not found');
        return;
    }

    const menuButtonsWithId = document.querySelectorAll(constants.DOM.querySelect);

    menuButtonsWithId.forEach((btn) => {
        const buttonConfig = buttons.BUTTON_MAP[btn.id];
        if (buttonConfig) {
            events.registerEventListener(
                buttonConfig.route,
                window.eventTracker,
                btn,
                'click',
                buttonConfig.handler
            );
        }
    });
}
export default { addMenuBtnsEvents, builderHome, buttons };