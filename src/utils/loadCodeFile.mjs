import { textToCell } from './textToCell.mjs';

/**
 * Loads the file format into the in-memory format for the Code Grid.
 */
export function loadCodeFile(codeGrid) {
  return codeGrid.map((row) => row.map((cell) => (cell ? textToCell(cell) : null)));
}
