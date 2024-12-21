export function changeRoute(route) {
	window.location.hash = route;
}

function setupEventListeners() {
	const button = document.getElementById('t');
	if (button) {
		button.addEventListener('click', () => {
			console.log('Dynamic button clicked!');
			button.innerText = 'Clicked!';
		});
	}
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
		setupEventListeners();
	})
}

document.addEventListener('DOMContentLoaded', function () {
	loadContent();

	window.addEventListener('hashchange', loadContent);
	window.changeRoute = changeRoute;
});
