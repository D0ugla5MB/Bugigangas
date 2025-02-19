const MAIN_CONTAINER = Object.freeze('main');
const TEXT = Object.freeze('p');
const GRID_CELL = Object.freeze('span');
const GRID_LINE = Object.freeze('div');
const GRID = Object.freeze('section');
const CATEGORY_MENU = Object.freeze('section');
const CATEGORY_MENU_BTN = Object.freeze('btn');
const CATEGORY_MENU_OPTIONS = Object.freeze('nav');
const WORD_COUNT = Object.freeze('section');
const WORD_COUNT_FRACTION = Object.freeze('div');
const WORD_COUNT_CURRENT = Object.freeze('span');
const WORD_COUNT_TOTAL = Object.freeze('span');
const WORD_COUNT_DIVISION_BAR = Object.freeze('span');
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
    Grid: {
        gridCell: GRID_CELL,
        gridLine: GRID_LINE,
        gridContainer: GRID,
    },
    WordCounter: {
        counter: WORD_COUNT,
        current: WORD_COUNT_CURRENT,
        total: WORD_COUNT_TOTAL,
        fraction: WORD_COUNT_FRACTION,
        fracBar: WORD_COUNT_DIVISION_BAR
    },
    Word: {
        colorCorrect: COLOR_CORRECT,
        colorIncorrect: COLOR_INCORRECT,
    },
    CategoryMenu: {
        menuBase: CATEGORY_MENU,
        menuBtn: CATEGORY_MENU_BTN,
        menuOpt: CATEGORY_MENU_OPTIONS
    },
    Text: TEXT,
    linesSet: LINES_SET,
    units: UNITS,
    main: MAIN_CONTAINER,
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