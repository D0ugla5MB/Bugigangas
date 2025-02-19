import { buildGrid, buildCategoryMenu, buildWordCounter, mainContainer } from "./builder.js";
import { VALUES, BUILDING } from "./values.js";
import { wordCounter as counterFunc } from "./utils.js";

export function runWordSeek() {
    const appContainer = document.getElementById('wordseek-app');
    appContainer.innerHTML = '';
    const main = mainContainer(BUILDING.main);
    const menu = buildCategoryMenu(BUILDING.CategoryMenu, { menuId: 'category-menu', txt: BUILDING.Text });
    const grid = buildGrid(BUILDING.Grid.gridContainer, VALUES.gridDefaultSize[0], { gridId: 'grid' });
    const wordCounter = buildWordCounter(BUILDING.WordCounter, counterFunc(2, 10), { counterId: 'word-counter', fractionId: 'fraction', numId: 'num', denId: 'den', lineClass: 'line' });


    main.appendChild(grid);
    main.appendChild(wordCounter);
    appContainer.appendChild(main);
    appContainer.appendChild(menu);
}

export default { runWordSeek };