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

function showConsoleMsg(envVar) {
    if (window.location.pathname.toString() === envVar) {
        console.warn('You are in the production environment');
    } else {
        console.warn('Remember to clear session storage while debbuging');
        console.warn('The current debugger tool will be substituted by the browser console while a new one is being developed');
        console.warn('main being used as a shared css file too for while');
        console.log('The values from WordSeek are still being prepared');
    }
}


function debounce(func, delay) {
    let timer = null;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function rng(min, max) {
    if (typeof min !== 'number' && typeof max !== 'number') {
        return NaN;
    }
    if (min > max) {
        min = min + max;
        max = min - max;
        min = min - max;
    }
    if (min === max) {
        min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default {
    clearContainer,
    clearHeadLinks,
    clearSessionStorage,
    showConsoleMsg,
    appendLog,
    debounce,
    rng
};
