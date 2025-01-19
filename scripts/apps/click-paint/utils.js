import { eventTrackerTool } from '../../utils/utils.js';
import { ROUTES } from '../../utils/constants.js';

export function makeDraggable(element) {
    let elemPosition = { x: 0, y: 0 };

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        element,
        'dragstart',
        (event) => {
            elemPosition.x = event.clientX - element.offsetLeft;
            elemPosition.y = event.clientY - element.offsetTop;
        }
    );

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        document,
        'dragover',
        (event) => {
            event.preventDefault();
            element.style.left = `${event.clientX - elemPosition.x}px`;
            element.style.top = `${event.clientY - elemPosition.y}px`;
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
