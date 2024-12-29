import { clickState } from "./state.js";


function freeBlocker(clickEvent) {
    const main = document.getElementById('app-root');
    if (clickEvent) {
        main.classList.remove('main-blocked');
        main.removeAttribute('class');
    }
}
export function watchContainerBlocker() {
    const containerMsg = document.getElementById('close-msg');
    const click = clickState();
    containerMsg.addEventListener('click', () => {
        click().doClick();
        freeBlocker(click().getState());
        containerMsg.parentElement.remove();
    });
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
