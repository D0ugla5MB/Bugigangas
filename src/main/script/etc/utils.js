import { eventTrackerTool } from '../../utils/utils.js';
import { ROUTES } from '../../utils/constants.js';

export function watchPointer(event) {
    return [event.offsetX, event.offsetY];
}

export function clearContainer(container) {
    if (container instanceof Node) {
        container.innerHTML = '';
        return;
    }
    document.getElementById(container).innerHTML = '';
}

export function clearHeadLinks() {
    const children = document.head.children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].classList.contains('dynamic-style')) {
            children[i].remove();
        }
    }
}