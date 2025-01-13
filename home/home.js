import { EnvVars, changeRoute } from "../modules/router.js";
import { cacheTool, eventTrackerTool } from '../modules/utils.js';

export function addMenuBtnsEvents() {
    const index_menu = document.getElementById(EnvVars.getNavMenu);

    if (!index_menu) {
        console.error('Menu element not found');
        return;
    }

    const menuButtonsWithId = document.querySelectorAll(EnvVars.getQuerySelect);

    // TODO: Create a func to dynamically generate buttons, before append them to the DOM, to avoid to use cond. blocks.
    menuButtonsWithId.forEach((btn) => {
        switch (btn.id) {
            case EnvVars.getKeyBtnNav:
                btn.addEventListener('click', () => {
                    document.getElementById(EnvVars.getNavMenu).hidden = !document.getElementById(EnvVars.getNavMenu).hidden;
                });
                break;

            case EnvVars.getKeyBtnClickPaint:
                eventTrackerTool.registerEventListener(
                    EnvVars.getHashClickPaint,
                    window.eventTracker,
                    btn,
                    'click',
                    () => { changeRoute(EnvVars.getHashClickPaint); }
                );
                break;

            default:
                console.warn(`No event handler for button with id ${btn.id}`);
                break;
        }
    });
}
