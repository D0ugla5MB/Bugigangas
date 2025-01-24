function initEventTracker() {
    return new Map();
}
function removeRegisEvent(hash, tracker, eventType) {
    const eventKey = tracker.get(`${hash}-${eventType}`);
    if (eventKey) {
        eventKey.element.removeEventListener(eventKey.eventType, eventKey.triggerReact);
        tracker.delete(`${hash}-${eventType}`);
    }
}
function manageEvents(tracker, appHash) {
    tracker.forEach((event, key) => {
        if (!key.includes(appHash)) {
            event.element.removeEventListener(event.eventType, event.triggerReact);
            tracker.delete(key);
        }
    });
}
function registerEventListener(hash, tracker, element, eventType, triggerReact) {
    const key = `${hash}-${eventType}`;
    tracker.set(key, { element, eventType, triggerReact });
    element.addEventListener(eventType, triggerReact);
}

export default {
    initEventTracker,
    removeRegisEvent,
    manageEvents,
    registerEventListener
};