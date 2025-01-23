export function clickState() {
    let state = false;
    return () => {
        function doClick() { state = true; }
        function undoClick() { state = false; }
        function getState() { return state; }
        return { doClick, undoClick, getState };
    };
}
export function count() {
    let num = 0;
    return () => {
        function getNum() { return num; }
        function addOne() { ++num; }
        return { getNum, addOne };
    };
}

export const counterContainer = (clicksQty) => {
    const div = document.createElement('div');

    div.className = 'main-blocked';
    div.setAttribute('id', 'clicks-num');
    div.setAttribute('draggable', 'true');
    div.textContent = `Number of total clicks: ${clicksQty}`;
    return div;
};
