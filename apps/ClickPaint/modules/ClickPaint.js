import { svgContainer, getSvgContainerSide, getViewportDimensions, watchContainerBlocker, counterContainer, resizePaintArea, circle, buildBlockerContainer, buildMainContainer } from "./domHelpers.js";
import { count, clickState } from "./state.js";
import { watchPointer, generateColor } from "./utils.js";
import {eventTrackerTool} from '../../../modules/utils.js';

function buildPaintArea() {
    return svgContainer(getSvgContainerSide(getViewportDimensions()));
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

    appContainer.appendChild(paintContainer);
    paintContainer.appendChild(paintArea);
    appContainer.appendChild(clicksCounter);
    appContainer.appendChild(blockerMsg);

    watchContainerBlocker();

    paintArea = document.getElementById('paint-area');
    eventTrackerTool.registerEventListener(
        '#clickpaint',
        window.eventTracker,
        window,
        'resize',
        () => {
            setTimeout(() => {
                resizePaintArea(paintArea);
            }, 180);
        }
    );
    eventTrackerTool.registerEventListener(
        '#clickpaint',
        window.eventTracker,
        paintArea,
        'click',
        () => {
            click().doClick();
            addClick().addOne();
            console.log(`clicks count:\t${addClick().getNum()}`);
            const countDiv = document.getElementById('clicks-num');
            countDiv.textContent = `Number of total clicks: ${addClick().getNum()}`;
        }
    );
    eventTrackerTool.registerEventListener(
        '#clickpaint',
        window.eventTracker,
        paintArea,
        'mousemove',
        (event) => {
            if (click().getState()) {
                click().undoClick();
                const [cx, cy] = watchPointer(event);
                console.log(`${cx}, ${cy}`);
                paintArea.appendChild(circle(cx, cy, 25, generateColor()));
            }
        }
    );
}