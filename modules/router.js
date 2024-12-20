export function changeRoute(route) {
	window.location.hash = route;
}

export function loadContent() {
	const hash = window.location.hash || '#';
	const contentDiv = document.getElementById('root');

	switch (hash) {
		case '#':
		case '#home':
			fetch('/home/home.html').then(response => response.text()).then(html => {
				contentDiv.innerHTML = html;
			});
			break;
		default:
			fetch('/error.html').then(response => response.text()).then(html => {
				contentDiv.innerHTML = html;
			});
			break;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	loadContent();

	window.addEventListener('hashchange', loadContent);
	window.changeRoute = changeRoute;
});
