import * as EnvVars from './modules/storage.js';
import { changeRoute, fetchContent } from './modules/router.js';
import { addMenuBtnsEvents } from './modules/home.js';
import { runClickPaint } from './apps/ClickPaint/modules/ClickPaint.js';
export {
    EnvVars,
    changeRoute,
    fetchContent as loadContent,
    addMenuBtnsEvents,
    runClickPaint
};

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', fetchContent);
    fetchContent();
});
