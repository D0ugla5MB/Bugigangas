const EQUATIONS = Object.freeze([
    SAFE_GRID_SIZE_EQ.CALC_SAFE_LIMIT,
    DIRECTIONS,
    BASE_INDEX_EQUATION.FIND_INDEX,
    ARROWS_QUANTITY.arrows_n,
]);

const BUILDING = Object.freeze([
    GRID_CONTAINER,
    GRID_CELL,
    GRID_LINE,
    GRID,
    WORD_COUNT,
    LINES_SET,
    COLOR_CORRECT,
    COLOR_INCORRECT,
    UNITS,
]);

const EVENTS = Object.freeze([
    EVENTS_APPROACHES.CLICK_TO_CLICK,
    EVENTS_APPROACHES.DRAG_SELECTION,
    EVENTS_APPROACHES.MANUAL_SELECTION,
]);

const VALUES = Object.freeze([
    STR_AUX,
    GAME_MODES,
    WORDS_CATEGORY_LIST,
    ARROWS_EQ_LIST,
]);

const DATA_SOURCE = Object.freeze({
    DATAMUSE: {
        end_point: 'https://api.datamuse.com/words?',
        query_list: {
            animals: ['ml=animal&rel_gen=animal&max=10','rel_gen=animal&max=10' ],
        }
    }
});

const GRID_CELL = document.createElement('span');
const GRID_LINE = document.createElement('div');
const GRID = document.createElement('section');
const WORD_COUNT = document.createElement('div');
const LINES_SET = Object.freeze([]);
const WORDS_CATEGORY_LIST = Object.freeze([]);
const ARROWS_EQ_LIST = Object.freeze([]);
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


export default {
    EQUATIONS,
    BUILDING,
    EVENTS,
    VALUES,
    APIs_SOURCE,
}