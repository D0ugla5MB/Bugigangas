import { constants, utils } from "../index.js";

function initEventTracker() {
    return new Map();
}

function manageEvents(tracker, urlSrc) {
    const currentHash = window.location.hash;
    const [...trackedRoutes] = tracker.keys();

    trackedRoutes.forEach(route => {
        if (route !== currentHash) {
            const subTracker = tracker.get(route);
            subTracker.forEach((eventData, eventKey) => {
                eventData.element.removeEventListener(
                    eventData.eventType,
                    eventData.triggerReact
                );
                subTracker.delete(eventKey);
            });
            tracker.delete(route);
        }
    });
}

function registerEventListener(hash, tracker, element, eventType, triggerReact, ...options) {

    if (!tracker.has(`${hash}`)) {
        tracker.set(`${hash}`, initEventTracker());
    }
    const hashTracker = tracker.get(`${hash}`);
    const key = `${hash}-${eventType}`;
    hashTracker.set(key, { element, eventType, triggerReact, ...options });
    element.addEventListener(eventType, triggerReact, ...options);
}

export default {
    initEventTracker,
    registerEventListener,
    manageEvents,
};
