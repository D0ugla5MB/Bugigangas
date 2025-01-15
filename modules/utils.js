const initCache = () => new WeakMap();
const initEventTracker = () => new Map();

export function clearContainer(container) {
    if (container instanceof Node) {
        container.innerHTML = '';
        return;
    }
    document.getElementById(container).innerHTML = '';
}

export function clearHeadLinks() { 
    const styles = document.head.getElementsByClassName('dynamic-style');
    while (styles.length > 0) {
        styles[styles.length - 1].remove();
    }
}

function manageCache(cache, keyHash, state) {
    cache.set(keyHash, {
        content: state.content.cloneNode(true),
        style: state.style.cloneNode(true)
    });
}

function getCache(memCache, keyHash) {
    return memCache.get(keyHash);
}

function logTrackerEvents(tracker) {
    console.log('Event Tracker Contents:');
    tracker.forEach((event, key) => {
        console.log(`Key: ${key}`);
        console.log(`Element: ${event.element.id}`);
        console.log(`Event: ${event.eventType}`);
        console.log('---');
    });
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


export const cacheTool = { initCache, manageCache, getCache };
export const eventTrackerTool = { initEventTracker, registerEventListener, manageEvents, logTrackerEvents };