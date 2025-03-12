import { clickState } from './state.js';
import { events as eventTrackerTool } from '../../core/index.js';
import { constants } from '../../core/index.js';
import utils from './utils.js';
import builder from './builder.js';

function freeBlocker(clickEvent) {
    if (clickEvent) {
        const blockedElements = document.querySelectorAll('.main-blocked');
        blockedElements.forEach(element => {
            element.classList.remove('main-blocked');
            if (!element.classList.length) {
                element.removeAttribute('class');
            }
        });
    }
}

function watchContainerBlocker() {
    const containerMsg = document.getElementById('close-msg');
    const click = clickState();

    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
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

function resizePaintArea(paintArea, containerSide) {
    const { width: widthSide, height: heightSide } = containerSide;
    paintArea.setAttributeNS(null, 'width', widthSide);
    paintArea.setAttributeNS(null, 'height', heightSide);
    paintArea.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
}

function makeDraggable(clickCnt, area) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let requestAniFrame = null;

    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        clickCnt,
        'pointerleave',
        () => {
            if (isDragging) {
                isDragging = false;
                clickCnt.classList.remove('dragging');
                if (requestAniFrame) cancelAnimationFrame(requestAniFrame);
            }
        }
    );

    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        clickCnt,
        'dblclick',
        (e) => {
            e.preventDefault();
            isDragging = !isDragging;
            
            if (isDragging) {
                initialX = e.clientX - currentX;
                initialY = e.clientY - currentY;
                clickCnt.classList.add('dragging');
            } else {
                clickCnt.classList.remove('dragging');
                if (requestAniFrame) cancelAnimationFrame(requestAniFrame);
            }
        }
    );
    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        area,
        'mousemove',
        (e) => {
            
            if (!isDragging) return;
            e.preventDefault();

            if (requestAniFrame) cancelAnimationFrame(requestAniFrame);

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            requestAniFrame = requestAnimationFrame(() => {
                clickCnt.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
                requestAniFrame = null;
            });
        }
    );
}

function registerClickCounterListener(clicksCounter, popupChecker, popupTimer, popupContainerAux) {
    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        clicksCounter,
        'click',
        (e) => {
            ++popupChecker;
            if (popupChecker === 2) {
                if (popupTimer) {
                    clearTimeout(popupTimer);
                }
                popupTimer = setTimeout(() => {
                    popupChecker = 0;
                    eventPopupDialogTip(popupContainerAux);
                }, 2000);
            }

            if (popupChecker > 2) { //deeper test it later
                popupChecker = 0;
                clearTimeout(popupTimer);
            }
        },
    );
}

function registerResizeListener(paintAreaAux, resizeTimer) {
    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        window,
        'resize',
        () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizePaintArea(paintAreaAux, utils.getViewportDimensions());
            }, 180);
        }
    );
}

function registerPaintAreaClickListener(paintAreaAux, click, addClick) {
    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        paintAreaAux,
        'click',
        () => {
            click().doClick();
            addClick().addOne();
            const countDiv = document.getElementById('clicks-num');
            countDiv.textContent = `Number of total clicks: ${addClick().getNum()}`;
        }
    );
}

function registerPaintAreaMouseMoveListener(paintAreaAux, click) {
    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        paintAreaAux,
        'mousemove',
        (event) => {
            if (click().getState()) {
                click().undoClick();
                const [cx, cy] = utils.watchPointer(event);
                paintAreaAux.appendChild(builder.circle(cx, cy, 25, utils.generateColor()));
            }
        }
    );
}

function eventPopupDialogTip(popupContainer) {
    let popupTimer = null;
    popupContainer.innerText = 'Player, do double-click to drop it!';
    popupContainer.show();

    if (popupTimer) clearTimeout(popupTimer);
    setTimeout(() => {
        popupContainer.close();
    }, 3000);
    return popupContainer;
}

export default {
    watchContainerBlocker,
    resizePaintArea,
    makeDraggable,
    registerClickCounterListener,
    registerResizeListener,
    registerPaintAreaClickListener,
    registerPaintAreaMouseMoveListener,
};