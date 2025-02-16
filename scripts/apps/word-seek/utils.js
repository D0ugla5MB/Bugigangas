import { utils as ParentUtils } from "/scripts/utils.js";
import { STR_AUX, DIRECTIONS, WORDS_CATEGORY_LIST, ARROWS_EQ_LIST } from "/scripts/apps/word-seek/values.js";

function defineGridSize(largerWord) {
    return
}

function validateUserInput() { }

function getRdnLetter() {
    return STR_AUX[ParentUtils.rng(0, STR_AUX.length - 1)];
}

function getRdnDirection() {
    return DIRECTIONS[ParentUtils.rng(0, DIRECTIONS.length - 1)];
}

function getRdnArrowEquation() {
    return ARROWS_EQ_LIST[ParentUtils.rng(0, ARROWS_EQ_LIST.length - 1)];
}

function selectRdnWord(categoryList) {
    if (categoryList.length === 0 || !categoryList) {
        return null;
    }
    return categoryList[ParentUtils.rng(0, categoryList.length - 1)];
}

function selectCategory(categoryList = WORDS_CATEGORY_LIST, categoryOption) {
    if (categoryList.length === 0 || typeof categoryList !== 'object' || !Array.isArray(categoryList)) {
        return [];
    }
    if (typeof categoryOption !== 'string') {
        return '';
    }
    return categoryList[ParentUtils.rng(0, categoryList.length - 1)];
}

const wordCounter = (foundWordList, targetWordList) => {
    let foundSize, targetSize = -1;

    if (typeof foundWordList !== 'number' && typeof targetWordList !== 'number') {
        return { foundSize, targetSize };
    }
    if (Array.isArray(foundWordList) && Array.isArray(targetWordList)) {
        foundSize = foundWordList.length;
        targetSize = targetWordList.length;
    }

    return () => {
        let cnt = Math.floor((foundSize / targetSize));
        return cnt !== targetSize ? { findAll: false, wordCnt: cnt } : { findAll: true, wordCnt: cnt };
    }
}

const foundWords = (word) => {
    const savedWords = [];

    return () => {
        return savedWords;
    }
};

const bufferLetter = (...info) => {
    return () => {
        const [letter, index, drct_type] = info;
        return { letter, inde, drct_type };
    };
};

const targetWords = (...param) => {
    /**
     * the param could be: target words, found words, or both
     * the type of param could be: object or string
     */
}