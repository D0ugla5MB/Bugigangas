import { events, router } from "../../core/index.js";
import { constants } from "../../utils/index.js";
import { addBackhomeEvents } from "./events.js";



const backHomeBtn = (btnId) => {
    return addBackhomeEvents(document.getElementById(btnId));
};
export default {
    backHomeBtn,
};
