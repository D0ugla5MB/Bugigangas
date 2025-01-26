import { ROUTES } from './utils/constants.js';

function changeRoute(route) {
	window.location.hash = route;
}

function getPathnameHash() {
	const hash = window.location.hash || '/';

	switch (hash) {
		case '/':
		case ROUTES.hash:
		case ROUTES.hashHome:
			return ROUTES.pages.home;
		case ROUTES.hashClickPaint:
			return ROUTES.pages.clickPaint;
		default:
			return ROUTES.pages.error;
	}
}

export default {
	changeRoute,
	getPathnameHash,
};