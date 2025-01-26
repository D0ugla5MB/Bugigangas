import { clickState } from "./state.js";
import { eventTrackerTool } from "../../utils/utils.js";

function freeBlocker(clickEvent) {
    if (clickEvent) {
        const blockedElements = document.querySelectorAll('.main-blocked');
        blockedElements.forEach(element => {
            element.classList.remove('main-blocked');
            if (!element.classList.length) {
                element.removeAttribute('class');
            }
        });
    }
}
export function watchContainerBlocker() {
    const containerMsg = document.getElementById('close-msg');
    const click = clickState();

    eventTrackerTool.registerEventListener(
        '#clickpaint',
        window.eventTracker,
        containerMsg,
        'click',
        () => {
            click().doClick();
            freeBlocker(click().getState());
            containerMsg.closest('.welcome-container').remove();
        }
    );
}

export function resizePaintArea(paintArea, containerSide) {
    const { width: widthSide, height: heightSide } = containerSide;
    paintArea.setAttributeNS(null, 'width', widthSide);
    paintArea.setAttributeNS(null, 'height', heightSide);
    paintArea.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
}


