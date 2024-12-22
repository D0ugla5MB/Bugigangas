import { addMenuBtnsEvents } from "../home/home.js";

export function changeRoute(route) {
	window.location.hash = route;
}

export function loadContent() {
	const hash = window.location.hash || '#';
	let htmlPath = '';

	switch (hash) {
		case '#':
		case '#home':
			htmlPath = '/home/home.html';
			break;
		default:
			htmlPath = '/error.html';
			break;
	}

	fetch(htmlPath)
		.then(response => response.text())
		.then(htmlContent => {
			const contentDiv = document.getElementById('root');
			contentDiv.innerHTML = htmlContent;
			if (contentDiv.hasChildNodes() && htmlPath.includes('home')) {
				addMenuBtnsEvents();
			}
		})
}