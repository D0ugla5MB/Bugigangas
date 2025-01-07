import {
	addMenuBtnsEvents,
	EnvVars,
} from "../app.js";

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

function fetchDomContent(url, containerId, scriptAux) {
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to fetch HTML content from ${url}`);
			}
			return response.text();
		})
		.then(htmlContent => {
			document.getElementById(containerId).innerHTML = htmlContent;
			if (scriptAux) scriptAux(); 
		})
		.catch(error => {
			console.error('Error fetching HTML content:', error);
		});
}

function fetchShadowDomContent(url, containerId, scriptAux) {
	const container = document.getElementById(containerId);
	let shadowRoot = container.shadowRoot || container.attachShadow({ mode: 'open' });

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to fetch Shadow DOM content from ${url}`);
			}
			return response.text();
		})
		.then(htmlContent => {
			shadowRoot.innerHTML = htmlContent;
			if (scriptAux) scriptAux(); 
		})
		.catch(error => {
			console.error('Error fetching Shadow DOM content:', error);
		});
}

export function fetchContent(currentUrl) {
	const mapDomType = [
		['home', fetchDomContent],
		['clickpaint', fetchShadowDomContent],
		['error', fetchDomContent]
	];
	const mapScript = [
		['home', addMenuBtnsEvents],
		['clickpaint', null],
	];
	
	const fetchType = mapDomType.find(([key]) => currentUrl.includes(key))?.[1];

	if (!fetchType) {
		console.error(`No matching fetch type for URL: ${currentUrl}`);
		return;
	}

	const scriptAux = mapScript.find(([key]) => currentUrl.includes(key))?.[1] || null;

	fetchType(currentUrl, EnvVars.getIndexContainerId, scriptAux);
}
