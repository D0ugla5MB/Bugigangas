import cache from './cache.js';
import builder from './builder.js';
import { constants } from '../utils/index.js';

function selectApp(appUrlHash) {
	switch (appUrlHash) {
		case 'home':
			return constants.mapApps.find(([k]) => k === 'home')[1];
		case 'clickpaint':
			return constants.mapApps.find(([k]) => k === 'clickpaint')[1];
		case 'wordseek':
			return constants.mapApps.find(([k]) => k === 'wordseek')[1];
		case 'wordseeksoon':
			return constants.mapApps.find(([k]) => k === 'wordseeksoon')[1];
		default:
			return constants.mapApps.find(([k]) => k === 'error')[1];
	}
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
		cache.cacheHtml(fragment, htmlPath);
		return fragment;
	} catch (error) {
		console.error('Error loading HTML:', error);
		return null;
	}
}
async function loadStyles(cssPath) {

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

		cache.cacheCssLink(cssPath, cssText);
		return styleElement;
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

export async function loadApp(whichContainer, appUrlHash) {
	try {
		const appResources = selectApp(appUrlHash);
		if (!appResources) {
			console.error('No app resources found');
			return;
		}

		const { html, css, module, main } = appResources;

		if (appUrlHash === constants.mapApps.find(([key]) => key === 'error')[1].html) {
			await builder.buildApp(whichContainer, html, css, null, null);
			return;
		}

		if (!html || !css) {
			console.error('Missing required resources');
			return;
		}

		await builder.buildApp(whichContainer, html, css, module, main);
	} catch (error) {
		console.error('Critical error loading app:', error);
	}
}

export default {
	loadHtml,
	loadStyles,
	loadModule,
	loadApp,
};
