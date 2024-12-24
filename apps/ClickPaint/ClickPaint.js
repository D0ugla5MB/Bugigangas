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

function paint() {
    let elem = document.createElement('span');
    elem.setAttribute('style', `color: ${generateColor()};`);
    elem.innerText = '@@@@@@@/';
    document.getElementById('paint-area').appendChild(elem);
    console.log('clicked!');
}

const main = document.getElementById('paint-area');
main.addEventListener('click', paint);