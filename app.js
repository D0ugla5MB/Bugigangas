import * as EnvVars from './modules/storage.js';
import { addMenuBtnsEvents } from './home/home.js';
import { runClickPaint } from './apps/ClickPaint/modules/ClickPaint.js';
import { fetchContent, changeRoute, getPathnameHash } from './modules/router.js';
export {
    EnvVars,
    changeRoute,
    addMenuBtnsEvents,
    runClickPaint,
    fetchContent,
};

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', () => {
        fetchContent(getPathnameHash());
        if (getPathnameHash().includes('click')) { setTimeout(runClickPaint, 1000) };
    });
    fetchContent(getPathnameHash());
});
