function generateColor() {
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

function watchPointer(event) {
    return [event.offsetX, event.offsetY];
}

function getViewportDimensions() {
    return {
        width: window.visualViewport?.width * 0.9 || window.innerWidth * 0.9,
        height: window.visualViewport?.height * 0.9 || window.innerHeight * 0.9
    };
}

export default {
    generateColor,
    watchPointer,
    getViewportDimensions
};