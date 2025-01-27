import { builder, events, utils, state } from './index.js';
import { constants } from '../../utils/index.js';
import { events as globalEventTracker } from '../../core/index.js';

function buildPaintArea() {
    return builder.svgContainer(utils.getViewportDimensions());
}

export function runClickPaint() {
    console.log('RUNNING CLICK PAINT GAME!');

    const addClick = state.count();
    const click = state.clickState();
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

    events.watchContainerBlocker();
    events.makeDraggable(clicksCounter);

    paintArea = document.getElementById('paint-area');
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