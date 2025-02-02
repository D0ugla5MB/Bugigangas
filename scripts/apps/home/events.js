import { constants } from '../../utils/index.js';
import { router } from '../../core/index.js';

const buttonHandlers = {
    [constants.DOM.btnIds.nav]: () => {
        document.getElementById(constants.DOM.navMenu).hidden =
            !document.getElementById(constants.DOM.navMenu).hidden;
    },
    [constants.DOM.btnIds.clickPaint]: () => {
        router.changeRoute(constants.ROUTES.hashClickPaint);
    },
    [constants.DOM.btnIds.back]: () => {
        router.changeRoute(constants.ROUTES.hashHome) || router.changeRoute(constants.ROUTES.hash);
    },
    [constants.DOM.btnIds.clickPaint]: () => { router.changeRoute(constants.ROUTES.hashClickPaint); }
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

export default {
    BUTTON_MAP
}