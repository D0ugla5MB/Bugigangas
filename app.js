import {loadContent } from "./modules/router.js";

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', loadContent);

    loadContent();
});
