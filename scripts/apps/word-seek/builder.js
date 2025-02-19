import { BUILDING, VALUES } from "./values.js";
import { getRdnLetter, wordCounter } from "./utils.js";


const gridCell = (cellBase, gridLetter, ...info) => {
    const cell = document.createElement(cellBase);
    const [{ gridId }] = info;

    cell.innerHTML = gridLetter;
    cell.id = gridId;
    return cell;
}

const gridLine = (lineBase, ...info) => {
    const line = document.createElement(lineBase);
    const [{ lineId }] = info;

    line.id = lineId;
    return line;
}

export function buildGrid(gridBase, dimension, ...info) {
    const [{ gridId }] = info;
    const cellSet = [];
    const lineSet = [];
    const cellQuantity = dimension * dimension;
    const grid = document.createElement(gridBase);

    grid.id = gridId;

    for (let i = 0; i < dimension; i++) {
        lineSet.push(
            gridLine(BUILDING.Grid.gridLine, { lineId: `${i}` })
        );
    }
    for (let i = 0; i < cellQuantity; i++) {
        cellSet.push(
            gridCell(BUILDING.Grid.gridCell, getRdnLetter(), { gridId: `${i}` })
        );
    }

    for (const l of lineSet) {
        const cells = cellSet.splice(0, 10);
        l.append(...cells);
    }

    grid.append(...lineSet);
    return grid;
}

export function buildCategoryMenu(menuParts, ...info) {
    const { menuBase, menuBtn, menuOpt } = menuParts;
    const [{ menuId, txt }] = info;

    const customTxt = (content) => {
        const text = document.createElement(txt);
        text.textContent = content;
        return text;
    };

    const menu = document.createElement(menuBase);
    menu.id = menuId;

    const buttons = {
        random: document.createElement(menuBtn),
        specific: document.createElement(menuBtn)
    };

    buttons.random.id = 'btn-random';
    buttons.random.append(customTxt('Random Category'));
    buttons.specific.id = 'btn-specific';
    buttons.specific.append(customTxt('Select Category'));

    const optionsList = document.createElement(menuOpt);
    optionsList.id = 'category-options';

    VALUES.wordsCategoryList.forEach(category => {
        const option = document.createElement(menuBtn);
        option.id = `category-${category.toLowerCase()}`;
        option.append(customTxt(category));
        optionsList.append(option);
    });

    menu.append(buttons.random, buttons.specific, optionsList);

    return menu;
}

export function buildWordCounter(wordCounterParts, counterFunc, ...info) {
    const { counter, current, total, fraction, fracBar } = wordCounterParts;
    const [{ counterId }] = info;

    const wordCounter = document.createElement(counter);
    const currentWords = document.createElement(current);
    const totalWords = document.createElement(total);
    const fractionDiv = document.createElement(fraction);
    const divisionBar = document.createElement(fracBar);

    wordCounter.id = counterId;
    currentWords.innerHTML = counterFunc(); //TODO: pass args to counterFunc
    divisionBar.textContent = '/';
    
    fractionDiv.append(currentWords, divisionBar, totalWords);
    wordCounter.append(fractionDiv);

    return wordCounter;
}

export default {
    buildGrid,
    buildCategoryMenu,
    buildWordCounter
};