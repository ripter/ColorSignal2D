import { getKey } from './getKey';

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
   * @return {Signal | null}
   */
  at(x, y) {
    const key = getKey(x, y);
    if (this.data.has(key)) {
      return this.data.get(key);
    }
    return null;
  }


  addSignal(x, y, cell) {
    const key = getKey(x, y);
    const symbols = codeMap.get(key) ?? new Set();
  }
}
