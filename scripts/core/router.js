import {constants} from '../utils/index.js';

function changeRoute(route) {
	window.location.hash = route;
}

function getPathnameHash() {
	const hash = window.location.hash || '/';

	switch (hash) {
		case '/':
		case constants.ROUTES.hash:
		case constants.ROUTES.hashHome:
			return constants.ROUTES.pages.home;
		case constants.ROUTES.hashClickPaint:
			return constants.ROUTES.pages.clickPaint;
		default:
			return constants.ROUTES.pages.error;
	}
}

export default {
	changeRoute,
	getPathnameHash,
};