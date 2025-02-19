import { buildGrid, buildCategoryMenu, buildWordCounter } from "./builder.js";
import { VALUES, BUILDING } from "./values.js";
import { wordCounter as counterFunc } from "./utils.js";

export function runWordSeek() {
    const appContainer = document.getElementById('wordseek-app');
    appContainer.innerHTML = '';

    const menu = buildCategoryMenu(BUILDING.category, { menuId: 'category-menu', txt: BUILDING.txt });
    const grid = buildGrid(BUILDING.gridContainer, VALUES.gridDefaultSize[0], { gridId: 'grid' });
    const wordCounter = buildWordCounter(BUILDING.wordCount, counterFunc, {counterId: 'word-counter'});
    console.log(menu);
    console.log(wordCounter);

    appContainer.appendChild(grid);
}

export default { runWordSeek };