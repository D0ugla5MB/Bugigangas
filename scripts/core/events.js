import { constants } from "../utils/index.js";

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

function manageEvents(tracker, hashEvent) {
    const aux = [];

    tracker.forEach((event, hashKey) => {
        aux.push([Object.values(event), hashKey]);
        if (!hashKey.includes(hashEvent) && hashKey.includes('#/')) {
            event.element.removeEventListener(event.eventType, event.triggerReact);
            tracker.delete(hashKey);
        }
    });

    console.log(aux);
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
    removeRegisEvent,
};
