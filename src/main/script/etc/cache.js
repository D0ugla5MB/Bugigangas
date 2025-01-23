export function cacheHtml(htmlContent, htmlPath) {
    if (htmlContent instanceof DocumentFragment) {
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(htmlContent.cloneNode(true));
        sessionStorage.setItem(htmlPath, tempDiv.innerHTML);
        return;
    }
}

export function cacheCss(cssPath, linkTag) {
    if (linkTag instanceof Node) {
        sessionStorage.setItem(cssPath, linkTag.outerHTML);
        return;
    }
    sessionStorage.setItem(cssPath, `${linkTag}`);
}
