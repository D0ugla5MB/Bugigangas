export function paintCircle() {
    /*  d = [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]^0.5
        d < 100
        100 >  [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]^0.5
        10000 > [(200 - r)^2 + (200 - g)^2 + (200 - b)^2]
        10000 > 40000 - 400r - 400g - 400b + r^2 + g^2 + b^2
        10000 > 120000 -400(r + g + b) + r^2 + g^2 + b^2
        0 > 110000 -400(r + g + b) + r^2 + g^2 + b^2
        110000 < 400(r + g + b) - r^2 - g^2 - b^2
        0 < 400(r + g + b) - r^2 - g^2 - b^2 - 110000
    */

    let r = Math.floor(Math.random() * 200);
    let g = Math.floor(Math.random() * 200);
    let b = Math.floor(Math.random() * 200);

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function makeDraggable(element) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let requestAniFrame = null;

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        element,
        'dblclick',
        (e) => {
            e.preventDefault();
            isDragging = !isDragging;

            if (isDragging) {
                initialX = e.clientX - currentX;
                initialY = e.clientY - currentY;
                element.classList.add('dragging');
            } else {
                element.classList.remove('dragging');
                if (requestAniFrame) cancelAnimationFrame(requestAniFrame);
            }
        }
    );

    eventTrackerTool.registerEventListener(
        ROUTES.hashClickPaint,
        window.eventTracker,
        document,
        'mousemove',
        (e) => {
            if (!isDragging) return;
            e.preventDefault();

            if (requestAniFrame) cancelAnimationFrame(requestAniFrame);

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            requestAniFrame = requestAnimationFrame(() => {
                element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
                requestAniFrame = null;
            });
        }
    );
}

export function buildMainContainer() {
    const mainContainer = document.createElement('main');
    mainContainer.id = 'app-main';
    mainContainer.className = 'main-blocked';

    return mainContainer;
}

export const circle = (cx, cy, r, style) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    elem.setAttributeNS(null, 'r', `${r}`);
    elem.setAttributeNS(null, 'cx', `${cx}`);
    elem.setAttributeNS(null, 'cy', `${cy}`);
    elem.setAttributeNS(null, 'fill', `${style}`);
    return elem;
};
export function getViewportDimensions() {
    return {
        width: window.visualViewport?.width * 0.9 || window.innerWidth * 0.9,
        height: window.visualViewport?.height * 0.9 || window.innerHeight * 0.9
    };
}
export const svgContainer = (containerSide) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const { width: widthSide, height: heightSide } = containerSide;
    elem.setAttributeNS(null, 'id', 'paint-area');
    elem.setAttributeNS(null, 'width', `${widthSide}`);
    elem.setAttributeNS(null, 'height', `${heightSide}`);
    elem.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
    elem.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
    return elem;
};
export function resizePaintArea(paintArea, containerSide) {
    const { width: widthSide, height: heightSide } = containerSide;
    paintArea.setAttributeNS(null, 'width', widthSide);
    paintArea.setAttributeNS(null, 'height', heightSide);
    paintArea.setAttributeNS(null, 'viewBox', `0 0 ${widthSide} ${heightSide}`);
}

