import { buildGrid } from "./builder.js";
import { VALUES, BUILDING } from "./values.js";

export function runWordSeek() {
    const appContainer = document.getElementById('wordseek-app');
    appContainer.innerHTML = '';
    const grid = buildGrid(BUILDING.gridContainer, VALUES.gridDefaultSize[0], { gridId: 'grid' });

    appContainer.appendChild(grid);
}

export default { runWordSeek };