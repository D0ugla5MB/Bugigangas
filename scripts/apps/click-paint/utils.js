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
            event.preventDefault();
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
    /*  d = [(255 - r)^2 + (255 - g)^2 + (255 - b)^2]^0.5
        d < 100
        [(255 - r)^2 + (255 - g)^2 + (255 - b)^2]^0.5 < 100
        [(255 - r)^2 + (255 - g)^2 + (255 - b)^2] < 10000
        {[255^2 -2*255r + r^2] + [255^2 -2*255g + g^2] + [255^2 -2*255b + b^2]} < 10000
        {3*(255^2) -2*255(r+g+b) + rr + bb + gg} < 10000
        {185075 -510(r+g+b) + rr + bb + gg} < 0
    */
    let r, g, b;
    let distanceCheck = -1;

    while (distanceCheck < 0) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        distanceCheck = r * r + g * g + b * b - 510 * (r + g + b) + 185075;
    }

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
export function watchPointer(event) {
    return [event.offsetX, event.offsetY];
}
