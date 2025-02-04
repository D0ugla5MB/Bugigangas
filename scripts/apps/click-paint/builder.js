import { constants } from "../../utils/index.js";
import { buildPaintArea } from "./ClickPaint.js";

function buildBlockerContainer() {
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

function buildMainContainer() {
    const mainContainer = document.createElement('main');
    mainContainer.id = constants.DOM.delegator.main;
    mainContainer.className = 'main-blocked';

    return mainContainer;
}

const circle = (cx, cy, r, style) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    elem.setAttributeNS(null, 'r', `${r}`);
    elem.setAttributeNS(null, 'cx', `${cx}`);
    elem.setAttributeNS(null, 'cy', `${cy}`);
    elem.setAttributeNS(null, 'fill', `${style}`);
    return elem;
};

const svgContainer = (containerSide) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const { width: widthSide, height: heightSide } = containerSide;
    elem.setAttributeNS(null, 'id', 'paint-area');
    elem.setAttributeNS(null, 'width', `${widthSide}`);
    elem.setAttributeNS(null, 'height', `${heightSide}`);
    elem.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
    elem.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    return elem;
};

const counterContainer = (clicksQty) => {
    const div = document.createElement('div');

    div.className = 'main-blocked';
    div.setAttribute('id', 'clicks-num');
    div.setAttribute('draggable', 'true');
    div.textContent = `Number of total clicks: ${clicksQty}`;
    return div;
};


const popupDialogTip = () => {
    try {
        const popupContainer = document.createElement('dialog');
        popupContainer.id = 'popup';
        popupContainer.innerText = 'Click on the circles to change their color!';
        popupContainer.classList.add('dialog-container', 'fade-div');
        
        return popupContainer;
    } catch (error) {
        console.log(error);
    }
}

function buildElements(clickCount) {
    return {
        appContainer: document.getElementById('click-paint-app'),
        blockerMsg: buildBlockerContainer(),
        paintContainer: buildMainContainer(),
        clicksCounter: counterContainer(clickCount.getNum()),
        popupContainer: popupDialogTip(0),
        paintArea: buildPaintArea()
    };
}

export function appendClickPaintElements(appContainer, paintContainer, paintArea, clicksCounter, blockerMsg, popupContainer) {
    try {
        appContainer.appendChild(paintContainer);
        paintContainer.appendChild(paintArea);
        appContainer.appendChild(clicksCounter);
        appContainer.appendChild(blockerMsg);
        appContainer.appendChild(popupContainer);
    } catch (error) {
        console.error('Error appending ClickPaint elements:', error);
        throw error;
    }
}

export default {
    buildElements,
    buildBlockerContainer,
    buildMainContainer,
    circle,
    svgContainer,
    counterContainer,
    popupDialogTip,
}