const DOM = {
    indexContainerId: 'root',
    navMenu: 'nav_menu',
    querySelect: 'button[id]',
    btnIds: {
        nav: 'btnNav',
        home: 'btn_home',
        error: 'btn_err',
        clickPaint: 'btn_click-paint'
    }
};

const ROUTES = {
    hash: '#',
    hashHome: '#home',
    hashError: '#error',
    hashClickPaint: '#clickpaint',
    pages: {
        home: '/pages/home.html',
        error: '/pages/error.html',
        clickPaint: '/pages/clickpaint.html'
    }
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
    }]
];

const ENV_VAR = 'https://web-bugigangas.vercel.app/';

export { DOM, ROUTES, mapApps, ENV_VAR };
