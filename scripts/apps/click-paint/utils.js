import { eventTrackerTool } from '../../utils/utils.js';
import { ROUTES } from '../../utils/constants.js';

export function makeDraggable(element) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let requestAniFrame = null;

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        element,
        'dblclick',
        (e) => {
            e.preventDefault();
            isDragging = !isDragging;
            element.style.cursor = isDragging ? 'grabbing' : 'grab';

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
        ROUTES.hashClickPaint,
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

export function generateColor() {
    /*  d = [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]^0.5
        d < 100
        100 >  [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]^0.5
        10000 > [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]
        10000 > 40000 - 400r - 400g - 400b + r^2 + g^2 + b^2
        10000 > 120000 -400(r + g + b) + r^2 + g^2 + b^2
        0 > 110000 -400(r + g + b) + r^2 + g^2 + b^2
        110000 < 400(r + g + b) - r^2 - g^2 - b^2
        0 < 400(r + g + b) - r^2 - g^2 - b^2 - 110000
    */

    let r = Math.floor(Math.random() * 200);
    let g = Math.floor(Math.random() * 200);
    let b = Math.floor(Math.random() * 200);

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
export function watchPointer(event) {
    return [event.offsetX, event.offsetY];
}
