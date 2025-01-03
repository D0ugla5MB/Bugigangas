import { svgContainer, getSvgContainerSide, getViewportDimensions, watchContainerBlocker, counterContainer, resizePaintArea, circle } from "./domHelpers.js";
import { count, clickState } from "./state.js";
import { watchPointer, generateColor } from "./utils.js";


function buildPaintArea() {
    return svgContainer('' + getSvgContainerSide(getViewportDimensions()));
}


export function runClickPaint() {
    console.log('RUNNING CLICK PAINT GAME!');

    watchContainerBlocker();

    const addClick = count();
    const click = clickState();

    const clicksCounter = counterContainer(addClick().getNum());
    const mainContainer = document.getElementById('app-root');
    let paintArea = buildPaintArea();

    if (!paintArea) throw console.error('Something wrong happened');

    mainContainer.appendChild(paintArea);
    mainContainer.appendChild(clicksCounter);

    paintArea = document.getElementById('paint-area');

    window.addEventListener('resize', () => {
        setTimeout(() => {
            resizePaintArea(paintArea);
        }, 180);
    });
    paintArea.addEventListener('click', () => {
        click().doClick();
        addClick().addOne();
        console.log(`clicks count:\t${addClick().getNum()}`);
        const countDiv = document.getElementById('clicks-num');
        countDiv.textContent = `Number of total clicks: ${addClick().getNum()}`;
    });
    paintArea.addEventListener('mousemove', (event) => {
        if (click().getState()) {
            click().undoClick();
            const [cx, cy] = watchPointer(event);
            console.log(`${cx}, ${cy}`);
            paintArea.appendChild(circle(cx, cy, 25, generateColor()));
        }
    });
}