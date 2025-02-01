import { constants } from '../../utils/index.js';

const buttonHandlers = {
    [constants.DOM.btnIds.nav]: () => {
        document.getElementById(constants.DOM.navMenu).hidden =
            !document.getElementById(constants.DOM.navMenu).hidden;
    },
    [constants.DOM.btnIds.clickPaint]: () => {
        router.changeRoute(constants.ROUTES.hashClickPaint);
    }
};

export default {
    buttonHandlers,
}