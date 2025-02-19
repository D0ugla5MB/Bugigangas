const TEXT = 'p';
const GRID_CELL = 'span';
const GRID_LINE = 'div';
const GRID = 'section';
const CATEGORY_MENU = 'section';
const CATEGORY_MENU_BTN = 'btn';
const CATEGORY_MENU_OPTIONS = 'nav';
const WORD_COUNT = 'div';
const WORD_COUNT_CURRENT = 'span';
const WORD_COUNT_TOTAL = 'span';
const LINES_SET = Object.freeze([]);
const WORDS_CATEGORY_LIST = Object.freeze([
    'Animals', 'Objects'
]);
const BASE_INDEX_EQUATION = Object.freeze({
    FIND_INDEX: (arr_len, sub_arr_len, sub_arr_r, sub_arr_c) =>
        (Math.floor(arr_len / sub_arr_len)) * sub_arr_r + sub_arr_c
});
const ARROWS_EQUATIONS = Object.freeze({});
const ARROWS_QUANTITY = Object.freeze({ arrows_n: (matrix_side_size) => { 4 * matrix_side_size - 8 } });
const DIRECTIONS = Object.freeze({
    LEFT: (n) => n - 1,
    RIGHT: (n) => n + 1,
    UP: (sub_arr_len, n) => -sub_arr_len * n + sub_arr_len,
    DOWN: (sub_arr_len, n) => sub_arr_len * n - sub_arr_len,
    TOP_LEFT: (sub_arr_len, n) => -sub_arr_len * n + sub_arr_len - n + 1,
    TOP_RIGHT: (sub_arr_len, n) => -sub_arr_len * n + sub_arr_len + n - 1,
    BOTTOM_LEFT: (sub_arr_len, n) => sub_arr_len * n - sub_arr_len - n + 1,
    BOTTOM_RIGHT: (sub_arr_len, n) => sub_arr_len * n - sub_arr_len + n - 1
});

//to decide
const UNITS = Object.seal({
    grid_container: '',
    grid_line: '_%',
    grid_cell: '_%',
});


const EVENTS_APPROACHES = Object.freeze({
    CLICK_TO_CLICK: ['click'],
    DRAG_SELECTION: ['mousedown', 'mousemove', 'mouseup'],
    MANUAL_SELECTION: ['click']
});
const SAFE_GRID_SIZE_EQ = Object.freeze({ CALC_SAFE_LIMIT: (word_long_s) => 2 * (word_long_s + Math.floor(word_long_s / 2)) });

const STR_AUX = Object.freeze({ LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });
const COLOR_CORRECT = Object.freeze('#00ff00');
const COLOR_INCORRECT = Object.freeze('#ff0000');
const GAME_MODES = Object.freeze({
    CLASSIC: 'classic',
    TIMER: 'timer',
    SCORE: 'score',
    HINTS: 'hints',
});

const GRID_DEFAULT_SIZE = [10, 15, 20];

export const EQUATIONS = Object.freeze({
    calcSafeLimit: SAFE_GRID_SIZE_EQ.CALC_SAFE_LIMIT,
    directions: DIRECTIONS,
    findIndex: BASE_INDEX_EQUATION.FIND_INDEX,
    arrowsQuantity: ARROWS_QUANTITY.arrows_n,
});

export const BUILDING = Object.freeze({
    gridCell: GRID_CELL,
    gridLine: GRID_LINE,
    gridContainer: GRID,
    wordCount: {
        counter: WORD_COUNT,
        current: WORD_COUNT_CURRENT,
        total: WORD_COUNT_TOTAL
    },
    linesSet: LINES_SET,
    colorCorrect: COLOR_CORRECT,
    colorIncorrect: COLOR_INCORRECT,
    units: UNITS,
    category: {
        menuBase: CATEGORY_MENU,
        menuBtn: CATEGORY_MENU_BTN,
        menuOpt: CATEGORY_MENU_OPTIONS
    },
    txt: TEXT,
});

export const EVENTS = Object.freeze({
    clickToClick: EVENTS_APPROACHES.CLICK_TO_CLICK,
    dragSelection: EVENTS_APPROACHES.DRAG_SELECTION,
    manualSelection: EVENTS_APPROACHES.MANUAL_SELECTION,
});

export const VALUES = Object.freeze({
    strAux: STR_AUX,
    gameModes: GAME_MODES,
    wordsCategoryList: WORDS_CATEGORY_LIST,
    arrowsEqList: ARROWS_EQUATIONS,
    gridDefaultSize: GRID_DEFAULT_SIZE,
});

export default {
    EQUATIONS,
    BUILDING,
    EVENTS,
    VALUES,
}