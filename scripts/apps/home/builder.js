import { events, router } from "../../core/index.js";
import { constants } from "../../utils/index.js";

function addBackhomeEvents(btn) {
    events.registerEventListener(constants.ROUTES.hashHome, window.eventTracker, btn, 'click', () => {
        if (window.location.hash === constants.ROUTES.hashHome) {
            return;
        }
        router.changeRoute(constants.ROUTES.hashHome);
    });

}

const backHomeBtn = (btnId) => {
    const btn = document.getElementById(btnId);
    addBackhomeEvents(btn);

    return btn;
};
export default {
    backHomeBtn,
};
