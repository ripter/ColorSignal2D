import { getKey } from './getKey.mjs';

/**
 * Class to make working with the 2D grid easier.
 * @type {Map}
 */
export class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = new Map();
  }

  /**
   * Returns the item at the grid location.
   * @param  {Number} x
   * @param  {Number} y
   * @return {Set<Symbol> | null}
   */
  at(x, y) {
    const key = getKey(x, y);
    if (this.data.has(key)) {
      return this.data.get(key);
    }
    return null;
  }

  /**
   * Adds the Symbol to the grid at x,y
   * @param {Number} x
   * @param {Number} y
   * @param {Cell} cell
   */
  addSymbol(x, y, cell) {
    const key = getKey(x, y);
    const symbols = this.data.get(key) ?? new Set();
    symbols.add(cell);
    this.data.set(key, symbols);
  }
}
