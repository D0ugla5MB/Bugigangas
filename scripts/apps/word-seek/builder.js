import { BUILDING, VALUES } from "./values.js";
import { getRdnLetter } from "./utils.js";

const gridCell = (cellBase, gridLetter, ...info) => {
    const cell = cellBase;
    const { gridId } = info;

    cell.innerHTML = gridLetter;
    cell.id = gridId;
    return cell;
}

const gridLine = (lineBase, ...info) => {
    const line = lineBase;
    const { lineId } = info;

    line.id = lineId;
    return line;
}

export function buildGrid(gridBase, dimension, ...info) {
    const { gridId } = info;
    const cellSet = [];
    const lineSet = [];
    const cellQuantity = dimension * dimension;

    gridBase.id = gridId;

    for (let i = 0; i < dimension; i++) {
        lineSet.push(
            gridLine(BUILDING.gridLine, { lineId: `${i * dimension * 10}${i * dimension}` })
        );
    }
    for (let i = 0; i < cellQuantity; i++) {
        cellSet.push(
            gridCell(BUILDING.gridCell, getRdnLetter(), { gridId: `${i * dimension}${i}` })
        );
    }

    for (const l of lineSet) {
        l.innerHTML = () => {
            for (let i = 0; i < dimension; i++) {
                l.appendChild(cellSet[i]);
            }
        };
    }

    gridBase.appendChild(lineSet);
    return grid;
}

export default { buildGrid };