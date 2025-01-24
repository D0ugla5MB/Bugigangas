import { ROUTES, mapApps } from './utils/constants.js';


export function selectApp(appUrlHash) {
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

async function loadPage(htmlPath) {
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
		cacheHtml(fragment, htmlPath);
		return fragment;
	} catch (error) {
		console.error('Error loading HTML:', error);
		return null;
	}
}

export async function loadStyles(cssPath) {

	if (sessionStorage.getItem(cssPath)) {
		const styleElement = document.createElement('style');
		styleElement.textContent = sessionStorage.getItem(cssPath);
		styleElement.className = 'dynamic-style';
		return styleElement;
	}

	try {
		const response = await fetch(cssPath);
		if (!response.ok) {
			throw new Error(`Failed to load styles from ${cssPath}`);
		}

		const cssText = await response.text();
		const styleElement = document.createElement('style');
		styleElement.textContent = cssText;
		styleElement.className = 'dynamic-style';

		cacheCssLink(cssPath, cssText);
		return styleElement;
	} catch (error) {
		console.error('Error loading styles:', error);
		return null;
	}
}

async function loadMainFunc(module, appMainFunc) {
	if (!module) {
		throw new Error(`Failed to load module from ${modulePath}`);
	}
	
	if (Object.hasOwn(module, appMainFunc)) {
		return module[appMainFunc];
	}
	throw new Error(`Function ${appMainFunc} not found in module ${modulePath}`);
}

async function loadModule(modulePath) {
	try {
		const module = await import(modulePath);
		if (!module) {
			throw new Error(`Failed to load module from ${modulePath}`);
		}
		return module;
	} catch (error) {
		console.error('Error loading module:', error);
		return null;
	}
}

export default {
	loadPage,
	loadStyles,
	loadMainFunc,
	loadModule,
};
