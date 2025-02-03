import { builder, events, utils, state } from './index.js';
import { constants } from '../../utils/index.js';
import { events as globalEventTracker } from '../../core/index.js';

function buildPaintArea() {
    return builder.svgContainer(utils.getViewportDimensions());
}


export function runClickPaint() {
    //TO-DO: refactor the creation of the elements to a builder
    //TO-DO: refactor the check the elements' existence before appending as like as each appending process
    const addClick = state.count();
    const click = state.clickState();
    const appContainer = document.getElementById('click-paint-app');
    const blockerMsg = builder.buildBlockerContainer();
    const paintContainer = builder.buildMainContainer();
    const clicksCounter = builder.counterContainer(addClick().getNum());
    let popupContainer = builder.popupDialogTip(0);
    let paintArea = buildPaintArea();
    let popupChecker = 0;
    let time = null;


    if (!paintArea) throw console.error('Something wrong happened');


    appContainer.appendChild(paintContainer);
    paintContainer.appendChild(paintArea);
    appContainer.appendChild(clicksCounter);
    appContainer.appendChild(blockerMsg);
    appContainer.appendChild(popupContainer);

    events.watchContainerBlocker();
    events.makeDraggable(clicksCounter);

    paintArea = document.getElementById('paint-area');
    popupContainer = document.getElementById(constants.DOM.popup);


    globalEventTracker.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        clicksCounter, // Don't forget to check it
        'dblclick', // Refactor: treat the duo dblclick on the same element
        (e) => {
            popupChecker += e.detail;

            if (time) {
                clearTimeout(time);
            }

            time = setTimeout(() => {
                builder.eventPopupDialogTip(popupContainer);
            }, 2000);

            if (popupChecker > 2) {
                clearTimeout(time);
                popupChecker = 0;
            }
        },
    );


    globalEventTracker.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        window,
        'resize',
        () => {
            setTimeout(() => {
                events.resizePaintArea(paintArea, utils.getViewportDimensions());
            }, 180);
        }
    );
    globalEventTracker.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        paintArea,
        'click',
        () => {
            click().doClick();
            addClick().addOne();
            const countDiv = document.getElementById('clicks-num');
            countDiv.textContent = `Number of total clicks: ${addClick().getNum()}`;
        }
    );
    globalEventTracker.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        paintArea,
        'mousemove',
        (event) => {
            if (click().getState()) {
                click().undoClick();
                const [cx, cy] = utils.watchPointer(event);
                paintArea.appendChild(builder.circle(cx, cy, 25, utils.generateColor()));
            }
        }
    );
}
export default { runClickPaint };