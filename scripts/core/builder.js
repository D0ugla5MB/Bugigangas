import { loader } from './index.js';
import { utils } from '../utils/index.js';

async function buildApp(targetContainer, appHtmlPath, appCssPath, appModulePath, appMainFunc) {
	const container = document.getElementById(targetContainer);

	utils.clearHeadLinks();
	utils.clearContainer(targetContainer);

	try {
		const [htmlContent, cssLink] = await Promise.all([
			loader.loadHtml(appHtmlPath),
			loader.loadStyles(appCssPath)
		]);

		if (!htmlContent || !cssLink) {
			throw new Error('Failed to load required resources');
		}

		document.head.appendChild(cssLink);
		container.appendChild(htmlContent);

		if (appModulePath && appMainFunc) {
			const moduleFunc = await loader.loadModule(appModulePath, appMainFunc);
			if (moduleFunc) {
				await moduleFunc();
			}
		}
	} catch (error) {
		console.error('Error building app:', error);
		return;
	}
}

export default { buildApp };
