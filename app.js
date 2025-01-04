import * as EnvVars from './modules/storage.js';
import { changeRoute, fetchContent } from './modules/router.js';
import { addMenuBtnsEvents } from './home/home.js';
export {
    EnvVars,
    changeRoute,
    loadContent,
    addMenuBtnsEvents
};

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', fetchContent);
    fetchContent();
});
