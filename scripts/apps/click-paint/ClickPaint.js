import { watchContainerBlocker, resizePaintArea } from "./events.js";
import { getViewportDimensions } from "./utils.js";
import builder from "./builder.js";
import { count, clickState } from "./state.js";
import { watchPointer, generateColor, makeDraggable } from "./utils.js";
import { eventTrackerTool } from '../../utils/utils.js';
import { ROUTES } from '../../utils/constants.js';

function buildPaintArea() {
    return builder.svgContainer(getViewportDimensions());
}

export function runClickPaint() {
    console.log('RUNNING CLICK PAINT GAME!');

    const addClick = count();
    const click = clickState();
    const appContainer = document.getElementById('click-paint-app');
    const blockerMsg = builder.buildBlockerContainer();
    const paintContainer = builder.buildMainContainer();
    const clicksCounter = builder.counterContainer(addClick().getNum());
    let paintArea = buildPaintArea();
    
    if (!paintArea) throw console.error('Something wrong happened');
    
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
                paintArea.appendChild(builder.circle(cx, cy, 25, generateColor()));
            }
        }
    );

}