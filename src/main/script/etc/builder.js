import { clearHeadLinks, clearContainer } from '../utils';


export async function buildApp(targetContainer, appHtmlPath, appCssPath, appModulePath, appMainFunc) {
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

        document.head.appendChild(cssLink);
        container.appendChild(htmlContent);

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
