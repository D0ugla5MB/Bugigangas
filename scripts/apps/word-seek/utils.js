import { utils as ParentUtils } from "/scripts/utils/index.js";
import { EQUATIONS, BUILDING, EVENTS, VALUES } from "/scripts/apps/word-seek/values.js";

function defineGridSize(largerWord) {
    return
}

function validateUserInput() { }

export function getRdnLetter() {
    const letters = VALUES.strAux.LETTERS;
    return letters[ParentUtils.rng(0, letters.length - 1)];
}

function getRdnDirection() {
    const directionsArr = Object.values(EQUATIONS.directions);
    return directionsArr[ParentUtils.rng(0, directionsArr.length - 1)];
}

function getRdnArrowEquation() {
    return VALUES.arrowsEqList[ParentUtils.rng(0, VALUES.arrowsEqList.length - 1)];
}

export function selectGridSize(larger_word_size) {
    if (larger_word_size < 10) return VALUES.gridDefaultSize[0];
    if (larger_word_size < 15) return VALUES.gridDefaultSize[1];
    if (larger_word_size < 20) return VALUES.gridDefaultSize[2];
    return EQUATIONS.calcSafeLimit(larger_word_size);
}

export const wordCounter = (foundWordList, targetWordList) => {
    let foundSize = -1;
    let targetSize = -1;

    if (typeof foundWordList !== 'number' && typeof targetWordList !== 'number') {
        return { foundSize, targetSize };
    }
    if (Array.isArray(foundWordList) && Array.isArray(targetWordList)) {
        foundSize = foundWordList.length;
        targetSize = targetWordList.length;
    }

    return () => {
        return foundSize !== targetSize ? { findAll: false, num: foundSize, den: targetSize } : { findAll: true, num: foundSize, den: targetSize };
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
        return { letter, index, drct_type };
    };
};

const targetWords = (...param) => {
    /**
     * the param could be: target words, found words, or both
     * the type of param could be: object or string
     */
};