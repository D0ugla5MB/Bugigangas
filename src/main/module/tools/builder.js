function appList() {
    const apps = new Map();
    const setupResources = (name) => ({
        hashKey: `${ROUTES.hash}${name}`,
        events: eventsTrackerTool,
        cache: cacheTool,
        loader: loaderTool
    });

    return {
        letMeJoin: (appName) => {
            if (apps.has(appName)) {
                throw new Error(`App ${appName} already registered`);
            }

            const tools = setupResources(appName);
            apps.set(appName, tools);
        },
        giveMyTools: (appName) => {
            const tools = apps.get(appName);
            if (!tools) {
                throw new Error(`App ${appName} not registered.`);
            }
            return tools;
        },
        byebye: (appName) => {
            apps.delete(appName);
        }
    };
}

export const appManager = appList();

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
