import { svgContainer, getViewportDimensions, watchContainerBlocker, counterContainer, resizePaintArea, circle, buildBlockerContainer, buildMainContainer } from "./domHelpers.js";
import { count, clickState } from "./state.js";
import { watchPointer, generateColor, makeDraggable } from "./utils.js";
import { eventTrackerTool } from '../../utils/utils.js';
import { ROUTES } from '../../utils/constants.js';

function buildPaintArea() {
    return svgContainer(getViewportDimensions());
}


export function runClickPaint() {
    console.log('RUNNING CLICK PAINT GAME!');

    const addClick = count();
    const click = clickState();
    const appContainer = document.getElementById('click-paint-app');
    const blockerMsg = buildBlockerContainer();
    const paintContainer = buildMainContainer();
    const clicksCounter = counterContainer(addClick().getNum());
    let paintArea = buildPaintArea();
    
    if (!paintArea) throw console.error('Something wrong happened');
    
    clicksCounter.style.visibility = 'hidden';

    appContainer.appendChild(paintContainer);
    paintContainer.appendChild(paintArea);
    appContainer.appendChild(clicksCounter);
    appContainer.appendChild(blockerMsg);
    
    watchContainerBlocker();
    makeDraggable(clicksCounter);

    paintArea = document.getElementById('paint-area');
    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        window,
        'resize',
        () => {
            setTimeout(() => {
                resizePaintArea(paintArea, getViewportDimensions());
            }, 180);
        }
    );
    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
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
    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        paintArea,
        'mousemove',
        (event) => {
            if (click().getState()) {
                click().undoClick();
                const [cx, cy] = watchPointer(event);
                paintArea.appendChild(circle(cx, cy, 25, generateColor()));
            }
        }
    );

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        blockerMsg,
        'click',
        () => {
            if (!document.getElementById('container-msg')) {
                clicksCounter.style.visibility = 'visible';
            }
        }
    );
}