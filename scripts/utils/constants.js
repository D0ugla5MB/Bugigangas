// TODO: Refactor apps metadata into a more structured format

const DOM = {
    indexContainerId: 'root',
    navMenu: 'nav_menu',
    querySelect: 'button[id]',
    popup: 'popup',
    btnIds: {
        nav: 'btnNav',
        home: 'btn_home',
        error: 'btn_err',
        clickPaint: 'btn_click-paint',
        back: 'btn_back-home',
        wordSeek: 'btn_word-seek',
    },
    delegator: {
        root: 'root',
        app: 'app',
        main: 'app-main',
    }
};

const ROUTES = {
    hash: '#',
    hashHome: '#home',
    hashError: '#error',
    hashClickPaint: '#clickpaint',
    hashWordSeek: '#wordseek',
};

const mapApps = [
    ['home', {
        html: '/pages/home.html',
        css: '/styles/apps/home.css',
        module: '/scripts/apps/home/home.js',
        main: 'addMenuBtnsEvents',
    }],
    ['clickpaint', {
        html: '/pages/clickpaint.html',
        css: '/styles/apps/clickpaint.css',
        module: '/scripts/apps/click-paint/ClickPaint.js',
        main: 'runClickPaint',
    }],
    ['error', {
        html: '/pages/error.html',
        css: '/styles/apps/error.css',
        module: null,
        main: null
    }],
    ['wordseek', {
        html: '/pages/wordseek.html',
        css: '/styles/apps/wordseek.css',
        module: '/scripts/apps/word-seek/WordSeek.js',
        main: null,
    }],
];

const ENV_VAR = 'https://web-bugigangas.vercel.app/';


export default {
    DOM,
    ROUTES,
    mapApps,
    ENV_VAR,
};
