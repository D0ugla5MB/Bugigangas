import {
	EnvVars,
	addMenuBtnsEvents
} from "../app.js";

export function changeRoute(route) {
	window.location.hash = route;
}

export function fetchContent() {
	const hash = window.location.hash || EnvVars.getHash;
	let htmlPath = '';

	switch (hash) {
		case EnvVars.getHash:
		case EnvVars.getHashHome:
			htmlPath = EnvVars.getHomePage;
			break;
		case EnvVars.getHashClickPaint:
			htmlPath = EnvVars.getClickPaintPage;
			break;
		default:
			htmlPath = EnvVars.getErrorPage;
			break;
	}

	const rootDiv = document.getElementById(EnvVars.getIndexContainerId);
	const shadowRootDiv = rootDiv.attachShadow({mode: 'open'});
	fetch(htmlPath)
		.then(response => response.text())
		.then(htmlContent => {
			shadowRootDiv.innerHTML = htmlContent;
			if (rootDiv.hasChildNodes() && htmlPath.includes(EnvVars.getLoadContentFetchIf)) {
				addMenuBtnsEvents();
			}
		})
}