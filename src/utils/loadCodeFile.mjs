import { textToCodeSymbol } from './textToCodeSymbol.mjs';
import { Grid } from '../core/Grid.mjs';

/**
 * Loads the file format into the in-memory format for the Code Grid.
 */
export function loadCodeFile(codeArray) {
  const grid = new Grid(codeArray[0].length, codeArray.length);
  // console.log('codeGrid', codeArray, grid);

  codeArray.forEach((row, y) => row.forEach((cell, x) => {
    if (!cell) { return; }
    grid.add(x, y, textToCodeSymbol(cell));
  }));

  // return codeGrid.map((row) => row.map((cell) => (cell ? textToCodeSymbol(cell) : null)));
  // return JSON.parse(JSON.stringify(codeGrid), (key, value) => {
  //   if (typeof value === 'string') {
  //     return textToCodeSymbol(value);
  //   }
  //   return value;
  // });
  return grid;
}
