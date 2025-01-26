import { events, router } from "../../core/index.js";
import { constants } from "../../utils/index.js";
import homeEvents from './events.js';

const backHome = () => {
    try {
        const btn = document.getElementById(constants.DOM.btnIds.back);
        homeEvents.updateBackHomeStyle(router.getPathnameHash(), btn);
        
        if (btn) {
            events.registerEventListener(
                constants.ROUTES.hashHome,
                window.eventTracker,
                btn,
                'click',
                () => {
                    router.changeRoute(constants.ROUTES.hashHome);
                }
            );

            events.registerEventListener(
                constants.ROUTES.hashHome,
                window.eventTracker,
                window,
                'hashchange',
                () => {
                    homeEvents.updateBackHomeStyle(router.getPathnameHash(), btn);
                }
            );
        }
    } catch (error) {
        console.error(error);
    }
}

export default {
    backHome,
}