import { loadMenu } from "../home/home.js";

export function changeRoute(route) {
	window.location.hash = route;
}

function setupEventListeners() {

	const index_menu = document.getElementById('nav_menu');
	const menuBtn = document.getElementById('btnNav');
	const homeBtn = document.getElementById('btn_home');

	window.addEventListener('hashchange', loadContent);
	menuBtn.addEventListener('click', () => {
		console.log('Dynamic button clicked!');
		index_menu.hidden = !index_menu.hidden;
	});
	homeBtn.addEventListener('click', () => {
		changeRoute('#home');
	});
}

export function loadContent() {
	const hash = window.location.hash || '#';
	const contentDiv = document.getElementById('root');
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
			contentDiv.innerHTML = htmlContent;
			if (contentDiv.hasChildNodes() && htmlPath.includes('home')) {
				setupEventListeners();
			}
		})
}


document.addEventListener('DOMContentLoaded', function () {
	loadContent();
});
