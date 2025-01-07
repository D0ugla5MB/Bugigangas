import {
	EnvVars} from "../app.js";

export function changeRoute(route) {
	window.location.hash = route;
}

export function getPathnameHash() {
	const hash = window.location.hash || '/';

	switch (hash) {
		case '/':
		case EnvVars.getHash:
		case EnvVars.getHashHome:
			return EnvVars.getHomePage;
		case EnvVars.getHashClickPaint:
			return EnvVars.getClickPaintPage;
		default:
			return EnvVars.getErrorPage;
	}
}

