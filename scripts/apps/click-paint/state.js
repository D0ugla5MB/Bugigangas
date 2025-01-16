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
