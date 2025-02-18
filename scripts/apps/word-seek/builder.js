import { BUILDING, VALUES } from "./values.js";
import { getRdnLetter } from "./utils.js";

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
            gridLine(BUILDING.gridLine, { lineId: `${i * dimension * 10}${i * dimension}` })
        );
    }
    for (let i = 0; i < cellQuantity; i++) {
        cellSet.push(
            gridCell(BUILDING.gridCell, getRdnLetter(), { gridId: `${i * dimension}${i}` })
        );
    }

    console.log(cellSet[0]); // true
    console.log(cellSet[1]); // true

    console.log({
        firstCell_type: cellSet[0].outerHTML,
        firstLine_type: lineSet[0].outerHTML
    });

    for (const l of lineSet) {
        l.innerHTML = (() => {
            for (let i = 0; i < dimension; i++) {
                l.appendChild(cellSet[i]);
            }
        })();
        console.log(l);
    }



    grid.appendChild(...lineSet);
    return grid;
}

export default { buildGrid };