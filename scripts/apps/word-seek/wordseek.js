import { buildGrid, buildCategoryMenu } from "./builder.js";
import { VALUES, BUILDING } from "./values.js";

export function runWordSeek() {
    const appContainer = document.getElementById('wordseek-app');
    appContainer.innerHTML = '';

    const menu = buildCategoryMenu(BUILDING.category, {menuId: 'category-menu', txt: BUILDING.txt});
    const grid = buildGrid(BUILDING.gridContainer, VALUES.gridDefaultSize[0], { gridId: 'grid' });

    console.log(menu);

    appContainer.appendChild(grid);
}

export default { runWordSeek };