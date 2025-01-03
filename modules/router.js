import {
	EnvVars,
	addMenuBtnsEvents
} from "../app.js";

export function changeRoute(route) {
	window.location.hash = route;
}

function getHashUrl(hash) {
	switch (hash) {
		case EnvVars.getHash:
		case EnvVars.getHashHome:
			return EnvVars.getHomePage;
		case EnvVars.getHashClickPaint:
			return EnvVars.getClickPaintPage;
		default:
			return EnvVars.getErrorPage;
	}
}

export function fetchContent() {
	const hash = window.location.hash || EnvVars.getHash;
	let htmlPath = '';
	const rootDiv = document.getElementById(EnvVars.getIndexContainerId);
	let shadowRootDiv = '';

	
	htmlPath = getHashUrl(hash, htmlPath);
	fetch(htmlPath)
		.then(response => response.text())
		.then(htmlContent => {
			if (htmlPath.includes(EnvVars.getLoadContentFetchIf)) {
				addMenuBtnsEvents();
				return;
			} 

				shadowRootDiv = rootDiv.attachShadow({ mode: 'open' });
				shadowRootDiv.innerHTML = htmlContent;
		});
}


