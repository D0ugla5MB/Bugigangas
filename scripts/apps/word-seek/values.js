const GRID_CELL = document.createElement('span');
const GRID_LINE = document.createElement('div');
const GRID = document.createElement('section');
const WORD_SCORE = document.createElement('div');
const LINES_SET = [];
const WORD_LIST = {};
const ARROWS_EQ_LIST = [];
const BASE_INDEX_EQUATION = Object.freeze({
    FIND_INDEX: (arr_len, sub_arr_len, sub_arr_n, sub_arr_index) =>
        (Math.floor(arr_len / sub_arr_len)) * sub_arr_n + sub_arr_index
});
const ARROWS_QUANTITY = Object.freeze({ arrows_n: (matrix_side_size) => { 4 * matrix_side_size - 8 } });
const DIRECTIONS = Object.freeze({
    LEFT: (n) => -n + 1,
    RIGHT: (n) => n - 1,
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

const API_URL = Object.freeze({ DATAMUSE: 'https://www.datamuse.com/api/' });
const EVENTS_APPROACHES = Object.freeze({
    CLICK_TO_CLICK: ['click'],
    DRAG_SELECTION: ['mousedown', 'mousemove', 'mouseup'],
    MANUAL_SELECTION: ['click']
});
const SAFE_GRID_SIZE_EQ = Object.freeze({ CALC_SAFE_LIMIT: (word_long_s) => 2 * (word_long_s + Math.floor(word_long_s / 2)) });

const STR_AUX = Object.freeze({ LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });