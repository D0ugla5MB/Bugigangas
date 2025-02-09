import { events, router } from "../../core/index.js";
import { constants } from "../../utils/index.js";
import { loader, cache } from '../../core/index.js';
import { addBackhomeEvents, changeBtnView } from "./events.js";

const backHomeBtn = (btnId) => {
    let btn = document.getElementById(btnId);

    if (btn === null) {
        btn = document.createElement('button');
        btn.id = constants.DOM.btnIds.back;
        btn.textContent = 'BACK';
        addBackhomeEvents(btn);        
        document.getElementById(constants.DOM.indexContainerId).appendChild(btn);
        return;
    }
};

export default {
    backHomeBtn
};
