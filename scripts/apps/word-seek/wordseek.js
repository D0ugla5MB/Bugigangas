import { buildGrid } from "./builder.js";
import { VALUES } from "./values.js";

export function runWordSeek() {
    const appContainer = document.getElementById('wordseek-app');
    appContainer.innerHTML = '';
    const grid = buildGrid(VALUES.gridDefaultSize[0], { gridId: 'grid' });
}