import { cacheHtml, cacheCssLink } from './utils/utils.js';
import { clearContainer, clearHeadLinks } from "../../scripts/utils/utils.js";
import { ROUTES, mapApps } from './utils/constants.js';

export function changeRoute(route) {
	window.location.hash = route;
}

export function getPathnameHash() {
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

export async function loadApp(whichContainer, appUrlHash) {
	try {
		const appResources = selectApp(appUrlHash);
		if (!appResources) {
			console.error('No app resources found');
			return;
		}

		const { html, css, module, main } = appResources;

		if (appUrlHash === ROUTES.pages.error) {
			await buildApp(whichContainer, html, css, null, null);
			return;
		}

		if (!html || !css) {
			console.error('Missing required resources');
			return;
		}

		await buildApp(whichContainer, html, css, module, main);
	} catch (error) {
		console.error('Critical error loading app:', error);
	}
}