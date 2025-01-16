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
        width: window.innerWidth || window.visualViewport.width,
        height: window.innerHeight || window.visualViewport.height
    };
}
export function getSvgContainerSide(viewportDim) {
    return viewportDim.width > viewportDim.height ? viewportDim.height : viewportDim.width;
}
export const svgContainer = (containerSide) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    elem.setAttributeNS(null, 'id', 'paint-area');
    elem.setAttributeNS(null, 'width', `${containerSide}`);
    elem.setAttributeNS(null, 'height', `${containerSide}`);
    elem.setAttributeNS(null, 'viewBox', `0 0 ${containerSide} ${containerSide}`);
    elem.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    return elem;
};
export function resizePaintArea(paintArea) {
    const newSvgSide = getSvgContainerSide(getViewportDimensions());
    paintArea.setAttributeNS(null, 'width', newSvgSide);
    paintArea.setAttributeNS(null, 'height', newSvgSide);
    paintArea.setAttributeNS(null, 'viewBox', `0 0 ${newSvgSide} ${newSvgSide}`);
}
export const counterContainer = (clicksQty) => {
    const div = document.createElement('div');

    div.setAttribute('id', 'clicks-num');
    div.textContent = `Number of total clicks: ${clicksQty}`;
    return div;
};
