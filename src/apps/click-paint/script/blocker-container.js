import { eventTrackerTool } from "../../utils/utils.js";
import { clickState } from "./state.js";

export function buildBlockerContainer() {
    const section = document.createElement('section');
    section.className = 'welcome-container';

    const container = document.createElement('div');
    container.className = 'container';
    container.id = 'container-msg';

    const message = document.createElement('p');
    message.innerHTML = 'YOU ARE PLAYING CLICK PAINT!<br>HAVE FUN :D';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'close-msg';
    closeButton.textContent = 'Close';

    container.appendChild(message);
    container.appendChild(closeButton);
    section.appendChild(container);

    return section;
}function freeBlocker(clickEvent) {
    if (clickEvent) {
        const blockedElements = document.querySelectorAll('.main-blocked');
        blockedElements.forEach(element => {
            element.classList.remove('main-blocked');
            if (!element.classList.length) {
                element.removeAttribute('class');
            }
        });
    }
}
export function watchContainerBlocker() {
    const containerMsg = document.getElementById('close-msg');
    const click = clickState();

    eventTrackerTool.registerEventListener(
        '#clickpaint',
        window.eventTracker,
        containerMsg,
        'click',
        () => {
            click().doClick();
            freeBlocker(click().getState());
            containerMsg.closest('.welcome-container').remove();
        }
    );
}

