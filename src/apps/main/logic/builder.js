import { events, router } from "../../../core/index.js";
import { constants } from "../../../core/index.js";
import { loader, cache } from '../../../core/index.js';
import { addBackhomeEvents } from "./events.js";

const backHomeBtn = (btnId) => {
    let btn = document.createElement('button');
    btn.id = constants.DOM.btnIds.back;
    btn.textContent = 'BACK';
    btn.hidden = 'hidden';
    const styles = document.createElement('style');
    styles.textContent = `
    #${btnId} {
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin: 1rem;
    }

    #${btnId}:hover {
        background-color: #0056b3;
    }`;
    document.head.appendChild(styles);

  
    document.getElementById(constants.DOM.indexContainerId).parentElement.insertBefore(btn, document.getElementById(constants.DOM.indexContainerId));
    addBackhomeEvents(btn);
};

export default {
    backHomeBtn
};
