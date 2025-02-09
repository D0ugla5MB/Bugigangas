import constants from './constants.js';

function clearSessionStorage() {
    window.addEventListener('beforeunload', () => {
        sessionStorage.clear();

    });
}

function clearContainer(container) {
    if (container instanceof Node) {
        container.innerHTML = '';
        return;
    }
    document.getElementById(container).innerHTML = '';
}

function clearHeadLinks() {
    const children = document.head.children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].classList.contains('dynamic-style')) {
            children[i].remove();
        }
    }
}
function appendLog(elem = null, ...debLog) {
    const logs = [];
    debLog.forEach((log) => {
        logs.push(log);
    });

    for (const element of logs) {
        console.trace(elem);
        console.log(element);
    }
}

function showConsoleMsg() {
    if (window.location.pathname.toString() === constants.ENV_VAR) {
        console.warn('You are in the production environment');
    } else {
        console.warn('Remember to clear session storage while debbuging');
    }
    console.warn('The current debugger tool will be substituted by the browser console while a new one is being developed');
}

export default {
    clearContainer,
    clearHeadLinks,
    clearSessionStorage,
    showConsoleMsg,
    appendLog,
};
