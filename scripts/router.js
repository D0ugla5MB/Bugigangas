import { clearContainer, clearHeadLinks, cacheHtml, cacheCssLink } from './utils/utils.js';
import { ROUTES, mapApps } from './utils/constants.js';

export function changeRoute(route) {
	window.location.hash = route;
}

export function getPathnameHash() {
	const hash = window.location.hash || '/';

	switch (hash) {
		case '/':
		case ROUTES.hash:
		case ROUTES.hashHome:
			return ROUTES.pages.home;
		case ROUTES.hashClickPaint:
			return ROUTES.pages.clickPaint;
		default:
			return ROUTES.pages.error;
	}
}

function selectApp(appUrlHash) {
	if (appUrlHash === ROUTES.pages.error) {
		return mapApps.find(([key]) => key === 'error')[1];
	}

	const appResources = mapApps.find(([key]) => appUrlHash.includes(key))?.[1] || null;
	if (!appResources) {
		console.warn(`No matching app for URL: ${appUrlHash}, falling back to error page`);
		return mapApps.find(([key]) => key === 'error')[1];
	}
	return appResources;
}

/**
 * Resource Loading Functions
 * ------------------------
 * Functions for loading HTML, CSS, and JavaScript modules.
 * Each function handles its specific resource type and error cases.
 */

async function loadHtml(htmlPath) {
	if (sessionStorage.getItem(htmlPath)) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = sessionStorage.getItem(htmlPath);

		return tempDiv.firstElementChild;
	}

	try {
		const response = await fetch(htmlPath);
		if (!response.ok) {
			throw new Error(`Failed to load HTML from ${htmlPath}`);
		}
		const fragment = document.createDocumentFragment();
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = await response.text();

		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}

		return fragment;
	} catch (error) {
		console.error('Error loading HTML:', error);
		return null;
	}
}

async function loadStyles(cssPath) {

	if (sessionStorage.getItem(cssPath)) {
		const linkElement = document.createElement('link');
		linkElement.rel = 'stylesheet';
		linkElement.type = 'text/css';
		linkElement.href = cssPath;
		linkElement.className = 'dynamic-style';
		return linkElement;
	}

	try {
		const response = await fetch(cssPath);
		if (!response.ok) {
			throw new Error(`Failed to load styles from ${cssPath}`);
		}

		const linkElement = document.createElement('link');
		linkElement.rel = 'stylesheet';
		linkElement.type = 'text/css';
		linkElement.href = cssPath;
		linkElement.className = 'dynamic-style';

		return linkElement;
	} catch (error) {
		console.error('Error loading styles:', error);
		return null;
	}
}

async function loadModule(modulePath, appMainFunc) {
	try {
		const module = await import(modulePath);
		if (!module) {
			throw new Error(`Failed to load module from ${modulePath}`);
		}
		if (!appMainFunc) {
			return module;
		}
		if (Object.hasOwn(module, appMainFunc)) {
			return module[appMainFunc];
		}
		throw new Error(`Function ${appMainFunc} not found in module ${modulePath}`);
	} catch (error) {
		console.error('Error loading module:', error);
		return null;
	}
}

async function buildApp(targetContainer, appHtmlPath, appCssPath, appModulePath, appMainFunc) {
	const container = document.getElementById(targetContainer);

	clearHeadLinks();
	clearContainer(targetContainer);

	try {
		const [htmlContent, cssLink] = await Promise.all([
			loadHtml(appHtmlPath),
			loadStyles(appCssPath)
		]);

		if (!htmlContent || !cssLink) {
			throw new Error('Failed to load required resources');
		}

		cacheHtml(htmlContent, appHtmlPath);
		cacheCssLink(appCssPath, cssLink);

		container.appendChild(htmlContent);
		document.head.appendChild(cssLink);

		if (appModulePath && appMainFunc) {
			const moduleFunc = await loadModule(appModulePath, appMainFunc);
			if (moduleFunc) {
				await moduleFunc();
			}
		}
	} catch (error) {
		console.error('Error building app:', error);
		return;
	}
}

export async function loadApp(whichContainer, appUrlHash) {
	try {
		const appResources = selectApp(appUrlHash);
		if (!appResources) {
			console.error('No app resources found');
			return;
		}

		const { html, css, module, main } = appResources;

		if (appUrlHash === ROUTES.pages.error) {
			await buildApp(whichContainer, html, css, null, null);
			return;
		}

		if (!html || !css) {
			console.error('Missing required resources');
			return;
		}

		await buildApp(whichContainer, html, css, module, main);
	} catch (error) {
		console.error('Critical error loading app:', error);
	}
}