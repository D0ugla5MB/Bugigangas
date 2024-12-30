import * as EnvVars from './modules/storage.js';
import { changeRoute, loadContent } from './modules/router.js';
import { addMenuBtnsEvents } from './home/home.js';
import { runClickPaint } from './apps/ClickPaint/modules/ClickPaint.js';
export {
    EnvVars,
    changeRoute,
    loadContent,
    addMenuBtnsEvents,
    runClickPaint
};

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', loadContent);

    loadContent();
});
