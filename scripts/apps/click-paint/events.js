import { clickState } from './state.js';
import { events as eventTrackerTool } from '../../core/index.js';
import {constants} from '../../utils/index.js';

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
        '#clickpaint',
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

function makeDraggable(element) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let requestAniFrame = null;

    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        element,
        'dblclick',
        (e) => {
            e.preventDefault();
            isDragging = !isDragging;

            if (isDragging) {
                initialX = e.clientX - currentX;
                initialY = e.clientY - currentY;
                element.classList.add('dragging');
            } else {
                element.classList.remove('dragging');
                if (requestAniFrame) cancelAnimationFrame(requestAniFrame);
            }
        }
    );

    eventTrackerTool.registerEventListener(
        constants.ROUTES.hashClickPaint,
        window.eventTracker,
        document,
        'mousemove',
        (e) => {
            if (!isDragging) return;
            e.preventDefault();

            if (requestAniFrame) cancelAnimationFrame(requestAniFrame);

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            requestAniFrame = requestAnimationFrame(() => {
                element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
                requestAniFrame = null;
            });
        }
    );
}

export default {
    watchContainerBlocker,
    resizePaintArea,
    makeDraggable
};


