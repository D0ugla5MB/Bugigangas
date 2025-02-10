import { events, router } from "../../core/index.js";
import { constants } from "../../utils/index.js";
import { loader, cache } from '../../core/index.js';
import { addBackhomeEvents } from "./events.js";

const backHomeBtn = (btnId) => {
    let btn = document.createElement('button');
    btn.id = constants.DOM.btnIds.back;
    btn.textContent = 'BACK';
    btn.hidden = 'hidden';
  
    document.getElementById(constants.DOM.indexContainerId).parentElement.insertBefore(btn, document.getElementById(constants.DOM.indexContainerId));
    addBackhomeEvents(btn);
};

export default {
    backHomeBtn
};
