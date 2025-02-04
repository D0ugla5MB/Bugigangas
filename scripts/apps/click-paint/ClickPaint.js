import { builder, events, utils, state } from './index.js';
import { constants } from '../../utils/index.js';
import { events as globalEventTracker } from '../../core/index.js';
import { appendClickPaintElements } from './builder.js';

export function buildPaintArea() {
    return builder.svgContainer(utils.getViewportDimensions());
}

export function runClickPaint() {
    //TO-DO: refactor the creation of the elements to a builder
    //TO-DO: refactor the check the elements' existence before appending as like as each appending process
    const addClick = state.count();
    const click = state.clickState();
    const {
        appContainer,
        blockerMsg,
        paintContainer,
        clicksCounter,
        popupContainer,
        paintArea
    } = builder.buildElements(addClick());
    let popupChecker = 0;
    let popupTimer = null;
    let resizeTimer = null;

    if (!paintArea) throw console.error('Something wrong happened');

    appendClickPaintElements(appContainer, paintContainer, paintArea, clicksCounter, blockerMsg, popupContainer);

    events.watchContainerBlocker();
    events.makeDraggable(clicksCounter, appContainer);

    let paintAreaAux = document.getElementById('paint-area');
    let popupContainerAux = document.getElementById(constants.DOM.popup);

    events.registerClickCounterListener(clicksCounter, popupChecker, popupTimer, popupContainerAux);
    events.registerResizeListener(paintAreaAux, resizeTimer);
    events.registerPaintAreaClickListener(paintAreaAux, click, addClick);
    events.registerPaintAreaMouseMoveListener(paintAreaAux, click);
}
export default { runClickPaint };


