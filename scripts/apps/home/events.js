import { constants } from '../../utils/index.js';
import { router } from '../../core/index.js';
import { events } from '../../core/index.js';

const buttonHandlers = {
    [constants.DOM.btnIds.nav]: () => {
        document.getElementById(constants.DOM.navMenu).hidden =
            !document.getElementById(constants.DOM.navMenu).hidden;
    },
    [constants.DOM.btnIds.clickPaint]: () => {
        router.changeRoute(constants.ROUTES.hashClickPaint);
    },
    [constants.DOM.btnIds.back]: () => {
        if (window.location.hash === constants.ROUTES.hashHome) {
            return;
        }
        router.changeRoute(constants.ROUTES.hashHome);
    },
};

const BUTTON_MAP = {
    [constants.DOM.btnIds.nav]: {
        id: constants.DOM.btnIds.nav,
        handler: buttonHandlers[constants.DOM.btnIds.nav]
    },
    [constants.DOM.btnIds.clickPaint]: {
        id: constants.DOM.btnIds.clickPaint,
        route: constants.ROUTES.hashClickPaint,
        handler: buttonHandlers[constants.DOM.btnIds.clickPaint]
    },
    [constants.DOM.btnIds.back]: {
        id: constants.DOM.btnIds.back || constants.DOM.btnIds.home,
        handler: buttonHandlers[constants.DOM.btnIds.back]
    },
};

function changeBtnView(btnId) {
    const btn = document.getElementById(btnId);

    const isHome = [constants.ROUTES.hash, constants.ROUTES.hashHome].includes(window.location.hash);

    btn.hidden = isHome;
}

export function addBackhomeEvents(btn) {
    if (!btn) {
        return;
    }

    events.registerEventListener(constants.ROUTES.hashHome,
        window.eventTracker,
        btn,
        'click',
        buttonHandlers[constants.DOM.btnIds.back]
    );

    ['load', 'hashchange'].forEach(eventType => {
        window.addEventListener(eventType, () => changeBtnView(constants.DOM.btnIds.back));
    });

}

function registerButtonClickEvents(delegator) {
    events.registerEventListener(
        constants.ROUTES.hashHome,
        window.eventTracker,
        delegator,
        'click',
        (event) => {
            event.stopPropagation();
            try {
                const button = event.target.closest(constants.DOM.querySelect);
                if (!button || !delegator) {
                    return;
                }

                const hashKey = button.id;

                if (!BUTTON_MAP[hashKey]) {
                    throw new Error(`No handler found for button: ${hashKey}`);
                }
                return BUTTON_MAP[hashKey].handler();
            } catch (error) {
                console.error('Button handler error:', error);
                router.changeRoute(constants.ROUTES.hashError);
            }
        },
        {
            useCapture: false,
        }
    );
}


export default {
    BUTTON_MAP,
    registerButtonClickEvents,
    addBackhomeEvents,
    changeBtnView,
}