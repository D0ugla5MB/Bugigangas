const initCache = () => new WeakMap();
const initEventTracker = () => new Map();

function manageCache(cache, keyHash, state) {
    cache.set(keyHash, {
        content: state.content.cloneNode(true),
        style: state.style.cloneNode(true)
    });
}

function getCache(memCache, keyHash) {
    return memCache.get(keyHash);
}

function manageEvents(tracker, hashEvent) {
    tracker.forEach((hashKey, hashValues) => {
        if (hashKey.startsWith(hashEvent)) {
            hashValues.element.removeEventListener(hashValues.eventType, hashValues.triggerReact);
        }
    });
}

function registerEventListener(hash, tracker, element, eventType, triggerReact) {
    const key = `${hash}-${eventType}`;
    tracker.set(key, { element, eventType, triggerReact });
    element.addEventListener(eventType, triggerReact);
}


export const cacheTool = { initCache, manageCache, getCache };
export const eventTrackerTool = {initEventTracker, registerEventListener, manageEvents};