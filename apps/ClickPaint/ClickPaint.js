console.log('RUNNING CLICK PAINT GAME!');
let clicked = false;

function freeBlocker(clickEvent) {
    const main = document.getElementById('app-root');
    if (clickEvent) {
        main.classList.remove('main-blocked');
        main.removeAttribute('class');
    }
}

function controller() {
    if (clicked) {
        clearInterval(timer);
        console.log('STOPPED!');
        freeBlocker(clicked);
        return;
    }
    console.log('waiting the click...');
};
const timer = setInterval(controller, 500);

(function closeWelcomeMsg() {
    const containerMsg = document.getElementById('close-msg');
    containerMsg.addEventListener('click', () => {
        clicked = true;
        containerMsg.parentElement.remove();
    });
})();
/*--------------------------------------__SEPARATING FUNCTIONAL PARTS__--------------------------------*/

const svgContainer = (w, h) => {
    const mainContainer = document.getElementById('app-root');
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    elem.setAttributeNS(null, 'id', 'paint-area');
    elem.setAttributeNS(null, 'width', `${w}`);
    elem.setAttributeNS(null, 'height', `${h}`);
    elem.setAttributeNS(null, 'viewBox', `0 0 ${w} ${h}`);
    return elem;
}

const circle = (cx, cy, r, style) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    elem.setAttributeNS(null, 'r', `${r}`);
    elem.setAttributeNS(null, 'cx', `${cx}`);
    elem.setAttributeNS(null, 'cy', `${cy}`);
    elem.setAttributeNS(null,'fill', `${style}`);
    return elem;
}

function generateColor() {
    /*  d = [(255 - r)^2 + (255 - g)^2 + (255 - b)^2]^0.5 
        d < 100
        [(255 - r)^2 + (255 - g)^2 + (255 - b)^2]^0.5 < 100
        [(255 - r)^2 + (255 - g)^2 + (255 - b)^2] < 10000
        {[255^2 -2*255r + r^2] + [255^2 -2*255g + g^2] + [255^2 -2*255b + b^2]} < 10000
        {3*(255^2) -2*255(r+g+b) + rr + bb + gg} < 10000
        {185075 -510(r+g+b) + rr + bb + gg} < 0
    */
    let r, g, b;
    let distanceCheck = -1;

    while (distanceCheck < 0) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        distanceCheck = r * r + g * g + b * b - 510 * (r + g + b) + 185075;
    }

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function paint(elem) {
    console.log(elem);
    return elem;
}

function watchPointer(event) {
    return [event.clientX, event.clientY];
}

(function runApp() {
    const main = document.getElementById('app-root');
    const svgArea = svgContainer('500', '500');
    main.appendChild(svgArea);

    let clicked = false;
    const paintArea = document.getElementById('paint-area');
    

    paintArea.addEventListener('click', () => {
        clicked = true;
        console.log('clicked');
        
    });
    paintArea.addEventListener('mousemove', (event) => {
        if (clicked) {
            clicked = false;
            const [cx, cy] = watchPointer(event);
            paintArea.appendChild(circle(cx, cy, 25, generateColor()))
        }
    });
    
})();