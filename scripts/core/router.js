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
			return constants.mapApps.find(([key]) => key === 'home')[1].html;
		case constants.ROUTES.hashClickPaint:
			return constants.mapApps.find(([key]) => key === 'clickpaint')[1].html;
		default:
			return constants.mapApps.find(([key]) => key === 'error')[1].html;
	}
}

export default {
	changeRoute,
	getPathnameHash,
};