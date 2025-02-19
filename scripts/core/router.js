import {constants} from '../utils/index.js';

function changeRoute(route) {
	window.location.hash = route;
}

function getPathnameHash() {
    const hash = window.location.hash || '/';

    switch (hash) {
        case '':
        case '/':
        case constants.ROUTES.hash:
        case constants.ROUTES.hashHome:
            return 'home';
        case constants.ROUTES.hashClickPaint:
            return 'clickpaint'; 
        case constants.ROUTES.hashWordSeek:
            return 'wordseek';
        case constants.ROUTES.hashWordSeekSoon:
            return 'wordseeksoon';
        default:
            return 'error';
    }
}

export default {
	changeRoute,
	getPathnameHash,
};