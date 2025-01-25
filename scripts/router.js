import { ROUTES, mapApps } from './utils/constants.js';
import buildApp from './builder.js';
import { clearContainer, clearHeadLinks } from './utils/utils.js';
import { eventTrackerTool } from './events.js';

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

function selectApp(appUrlHash) {
	if (appUrlHash === ROUTES.pages.error) {
		return mapApps.find(([key]) => key === 'error')[1];
	}

	const appResources = mapApps.find(([key]) => appUrlHash.includes(key))?.[1] || null;
	if (!appResources) {
		console.warn(`No matching app for URL: ${appUrlHash}, falling back to error page`);
		return mapApps.find(([key]) => key === 'error')[1];
	}
	return appResources;
}

export default {
	changeRoute,
	getPathnameHash,
	selectApp
};