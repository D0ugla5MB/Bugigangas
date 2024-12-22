import {
	EnvVars,
	addMenuBtnsEvents
} from "../app.js";

export function changeRoute(route) {
	window.location.hash = route;
}

export function loadContent() {
	const hash = window.location.hash || EnvVars.getHash;
	let htmlPath = '';

	switch (hash) {
		case EnvVars.getHash:
		case EnvVars.getHashHome:
			htmlPath = EnvVars.getHomePage;
			break;
		default:
			htmlPath = EnvVars.getErrorPage;
			break;
	}

	fetch(htmlPath)
		.then(response => response.text())
		.then(htmlContent => {
			const contentDiv = document.getElementById(EnvVars.getIndexContainerId);
			contentDiv.innerHTML = htmlContent;
			if (contentDiv.hasChildNodes() && htmlPath.includes(EnvVars.getLoadContentFetchIf)) {
				addMenuBtnsEvents();
			}
		})
}