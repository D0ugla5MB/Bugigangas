import { events, router } from "../../core/index.js";
import {constants} from "../../utils/index.js";

function addBackhomeEvents(btn) {
    events.registerEventListener('BH', window.eventTracker, btn, 'click', () => {
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
