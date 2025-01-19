const initEventTracker = () => new Map();

export function cacheHtml(htmlContent, htmlPath) {
    if (htmlContent instanceof DocumentFragment) {
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(htmlContent.cloneNode(true));
        sessionStorage.setItem(htmlPath, tempDiv.innerHTML);
        return;
    }
    console.trace();
}

export function cacheCssLink(cssPath, linkTag) {
    if (linkTag instanceof Node) {
        sessionStorage.setItem(cssPath, linkTag.outerHTML);
        console.trace();
        debugger;
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
    console.trace();
}

function manageEvents(tracker, hashEvent) {
    tracker.forEach((event, hashKey) => {
        if (!hashKey.includes(hashEvent)) {
            event.element.removeEventListener(event.eventType, event.triggerReact);
            tracker.delete(hashKey);
        }
    });
    console.trace();
}

function registerEventListener(hash, tracker, element, eventType, triggerReact) {
    const key = `${hash}-${eventType}`;
    tracker.set(key, { element, eventType, triggerReact });
    element.addEventListener(eventType, triggerReact);
}


export const eventTrackerTool = { initEventTracker, registerEventListener, manageEvents };
