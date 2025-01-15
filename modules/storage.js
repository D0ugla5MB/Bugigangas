/* sessionStorage.setItem('appRouter', './modules/router.js');
sessionStorage.setItem('routerHome', '../home/home.js');
sessionStorage.setItem('homeRouter', '../modules/router.js'); */

export function cacheHtml(htmlContent, htmlPath) {
    if (htmlContent instanceof DocumentFragment) {
        sessionStorage.setItem(htmlPath, htmlContent.innerHTML);
        return;
    }
    sessionStorage.setItem(htmlPath, document.getElementById('root').innerHTML);
}

export function cacheCssLink(cssPath, linkTag) {
    if (linkTag instanceof Node) {
        sessionStorage.setItem(cssPath, linkTag.outerHTML);
        return;
    }
    sessionStorage.setItem(cssPath, `${linkTag}`);
}

sessionStorage.setItem('hash', '#');
sessionStorage.setItem('hashHome', '#home');
sessionStorage.setItem('hashError', '#error');
sessionStorage.setItem('hashAppClickPaint', '#clickpaint');
sessionStorage.setItem('homePage', '/home/home.html');
sessionStorage.setItem('errorPage', '/error.html');
sessionStorage.setItem('clickPaintPage', '/apps/ClickPaint/clickpaint.html');
sessionStorage.setItem('indexContainerId', 'root');
sessionStorage.setItem('nav_menu', 'nav_menu');
sessionStorage.setItem('querySelect', 'button[id]');
sessionStorage.setItem('keyBtnNav', 'btnNav');
sessionStorage.setItem('keyBtnHome', 'btn_home');
sessionStorage.setItem('keyBtnError', 'btn_err');
sessionStorage.setItem('keyBtnClickPaint', 'btn_click-paint');

/* export const getAppRouter = sessionStorage.getItem('appRouter');
export const getRouterHome = sessionStorage.getItem('routerHome');
export const getHomeRouter = sessionStorage.getItem('homeRouter'); */

export const getHash = sessionStorage.getItem('hash');
export const getHashHome = sessionStorage.getItem('hashHome');
export const getHashError = sessionStorage.getItem('hashError');
export const getHashClickPaint = sessionStorage.getItem('hashAppClickPaint');
export const getHomePage = sessionStorage.getItem('homePage');
export const getErrorPage = sessionStorage.getItem('errorPage');
export const getClickPaintPage = sessionStorage.getItem('clickPaintPage');
export const getIndexContainerId = sessionStorage.getItem('indexContainerId');
export const getNavMenu = sessionStorage.getItem('nav_menu');
export const getQuerySelect = sessionStorage.getItem('querySelect');
export const getKeyBtnNav = sessionStorage.getItem('keyBtnNav');
export const getKeyBtnHome = sessionStorage.getItem('keyBtnHome');
export const getKeyBtnError = sessionStorage.getItem('keyBtnError');
export const getKeyBtnClickPaint = sessionStorage.getItem('keyBtnClickPaint');
