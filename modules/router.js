import { addMenuBtnsEvents } from "../home/home.js";
import { getErrorPage, getHash, getHashHome, getHomePage, getIndexContainerId, getLoadContentFetchIf } from "./storage.js";

export function changeRoute(route) {
	window.location.hash = route;
}

export function loadContent() {
	const hash = window.location.hash || getHash;
	let htmlPath = '';

	switch (hash) {
		case getHash:
		case getHashHome:
			htmlPath = getHomePage;
			break;
		default:
			htmlPath = getErrorPage;
			break;
	}

	fetch(htmlPath)
		.then(response => response.text())
		.then(htmlContent => {
			const contentDiv = document.getElementById(getIndexContainerId);
			contentDiv.innerHTML = htmlContent;
			if (contentDiv.hasChildNodes() && htmlPath.includes(getLoadContentFetchIf)) {
				addMenuBtnsEvents();
			}
		})
}