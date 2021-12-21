import { Cell } from '../core/Cell.mjs';

/**
 * Converts symbol#RGBA into a Cell
 * @param  {String} rawText
 * @return {Cell}
 */
export function textToCell(rawText) {
  const split = rawText.split('#');
  const color = split.length === 2 ? split[1] : 'FFFFFF00';

  return new Cell(
    split[0],
    // Convert each pair of chars as an 8bit hex value.
    parseInt(color.substring(0, 2), 16), // Red
    parseInt(color.substring(2, 4), 16), // Green
    parseInt(color.substring(4, 6), 16), // Blue
    // Alpha is optional.
    color.length === 8 ? parseInt(color.substring(6, 8), 16) : 0x00,
  );
}
