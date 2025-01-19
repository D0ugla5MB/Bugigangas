const initEventTracker = () => new Map();

export function cacheHtml(htmlContent, htmlPath) {
    if (htmlContent instanceof DocumentFragment) {
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(htmlContent.cloneNode(true));
        sessionStorage.setItem(htmlPath, tempDiv.innerHTML);
        return;
    }
}

export function cacheCssLink(cssPath, linkTag) {
    if (linkTag instanceof Node) {
        sessionStorage.setItem(cssPath, linkTag.outerHTML);
        return;
    }
    sessionStorage.setItem(cssPath, `${linkTag}`);
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

function manageEvents(tracker, hashEvent) {
    tracker.forEach((event, hashKey) => {
        if (!hashKey.includes(hashEvent)) {
            event.element.removeEventListener(event.eventType, event.triggerReact);
            tracker.delete(hashKey);
        }
    });
}

function registerEventListener(hash, tracker, element, eventType, triggerReact) {
    const key = `${hash}-${eventType}`;
    tracker.set(key, { element, eventType, triggerReact });
    element.addEventListener(eventType, triggerReact);
}


export const eventTrackerTool = { initEventTracker, registerEventListener, manageEvents };
