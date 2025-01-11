import { getIndexContainerId } from './modules/storage.js';
import { loadApp, getPathnameHash } from './modules/router.js';


document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', () => {
        const hash = getPathnameHash();
        loadApp(getIndexContainerId, hash);
    });
    const initialHash = getPathnameHash();
    loadApp(getIndexContainerId, initialHash);
});