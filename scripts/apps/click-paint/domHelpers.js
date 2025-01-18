import { clickState } from "./state.js";
import { eventTrackerTool } from "../../utils/utils.js";

export function buildBlockerContainer() {
    const section = document.createElement('section');
    section.className = 'welcome-container';

    const container = document.createElement('div');
    container.className = 'container';
    container.id = 'container-msg';

    const message = document.createElement('p');
    message.innerHTML = 'YOU ARE PLAYING CLICK PAINT!<br>HAVE FUN :D';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'close-msg';
    closeButton.textContent = 'Close';

    container.appendChild(message);
    container.appendChild(closeButton);
    section.appendChild(container);

    return section;
}

export function buildMainContainer() {
    const mainContainer = document.createElement('main');
    mainContainer.id = 'app-main';
    mainContainer.className = 'main-blocked';

    return mainContainer;
}


function freeBlocker(clickEvent) {
    const main = document.getElementById('app-main');
    if (clickEvent) {
        main.classList.remove('main-blocked');
        main.removeAttribute('class');
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
export const circle = (cx, cy, r, style) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    elem.setAttributeNS(null, 'r', `${r}`);
    elem.setAttributeNS(null, 'cx', `${cx}`);
    elem.setAttributeNS(null, 'cy', `${cy}`);
    elem.setAttributeNS(null, 'fill', `${style}`);
    return elem;
};
export function getViewportDimensions() {
    return {
        width: window.visualViewport?.width * 0.9 || window.innerWidth * 0.9,
        height: window.visualViewport?.height * 0.9 || window.innerHeight * 0.9
    };
}
export const svgContainer = (containerSide) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const { width: widthSide, height: heightSide } = containerSide;
    elem.setAttributeNS(null, 'id', 'paint-area');
    elem.setAttributeNS(null, 'width', `${widthSide}`);
    elem.setAttributeNS(null, 'height', `${heightSide}`);
    elem.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
    elem.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    return elem;
};
export function resizePaintArea(paintArea, containerSide) {
    const { width: widthSide, height: heightSide } = containerSide;
    paintArea.setAttributeNS(null, 'width', widthSide);
    paintArea.setAttributeNS(null, 'height', heightSide);
    paintArea.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
}
export const counterContainer = (clicksQty) => {
    const div = document.createElement('div');

    div.setAttribute('id', 'clicks-num');
    div.setAttribute('draggable', 'true');
    div.textContent = `Number of total clicks: ${clicksQty}`;
    return div;
};
