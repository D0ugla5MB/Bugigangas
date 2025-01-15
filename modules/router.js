import * as EnvVars from './storage.js';
import { clearContainer, clearHeadLinks } from './utils.js';
export { EnvVars };

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

function selectApp(appUrlHash) {
	const mapApps = [
		['home', {
			html: '/home/home.html',
			css: '/home/home.css',
			module: '/home/home.js',
			main: 'addMenuBtnsEvents',
		}],
		['clickpaint', {
			html: '/apps/ClickPaint/clickpaint.html',
			css: '/apps/ClickPaint/assets/clickpaint.css',
			module: '/apps/ClickPaint/modules/ClickPaint.js',
			main: 'runClickPaint',
		}],
	];

	const appResources = mapApps.find(([key]) => appUrlHash.includes(key))?.[1] || null;
	if (!appResources) {
		console.error(`No matching app for URL: ${appUrlHash}`);
		return null;
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
		console.log(htmlPath);
		const fragment = document.createDocumentFragment();
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = sessionStorage.getItem(htmlPath);

		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		return fragment;
	}

	try {
		const response = await fetch(htmlPath);
		if (!response.ok) {
			throw new Error(`Failed to load HTML from ${htmlPath}`);
		}
		const htmlContent = await response.text();
		const fragment = document.createDocumentFragment();
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlContent;

		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		EnvVars.cacheHtml(fragment, htmlPath);	
		
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

		EnvVars.cacheCssLink(cssPath, linkElement);
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
		// Phase 1: Load Resources
		const [htmlContent, cssLink, moduleFunc] = await Promise.all([
			loadHtml(appHtmlPath),
			loadStyles(appCssPath),
			loadModule(appModulePath, appMainFunc)
		]);

		if (!htmlContent || !cssLink || !moduleFunc) {
			throw new Error('One or more resources failed to load');
		}

		// Phase 2: DOM Operations
		container.appendChild(htmlContent);
		document.head.appendChild(cssLink);
		await moduleFunc();

	} catch (error) {
		console.error('Error building app:', error);
		return;
	}
}

export async function loadApp(whichContainer, appUrlHash) {
	try {
		const appResources = selectApp(appUrlHash);
		if (!appResources) {
			return;
		}

		const { html, css, module, main } = appResources;
		if (!html || !css || !module) {
			console.error('Missing required resources');
			return;
		}

		await buildApp(whichContainer, html, css, module, main);
	} catch (error) {
		console.error('Critical error loading app:', error);
	}
}