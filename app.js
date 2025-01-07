import * as EnvVars from './modules/storage.js';
import { changeRoute } from './modules/router.js';
import { fetchContent } from "./modules/utils.js";
import { addMenuBtnsEvents } from './home/home.js';
import { runClickPaint } from './apps/ClickPaint/modules/ClickPaint.js';
import { fetchDomContent, fetchShadowDomContent, selectFetchFuncType, fetchContent } from './modules/utils.js';
export {
    EnvVars,
    changeRoute,
    fetchContent,
    addMenuBtnsEvents,
    runClickPaint,
    fetchDomContent,
    fetchShadowDomContent,
    fetchContent,
    selectFetchFuncType as createContentManager,
};

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', () => {
        fetchContent('' + window.location.pathname);
    });
    fetchContent('' + window.location.pathname);
});
