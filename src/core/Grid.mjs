import { CodeSymbol } from './CodeSymbol.mjs';
import { fromKey, getKey } from './getKey.mjs';
import { GridCell } from './GridCell.mjs';


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
   * Returns an array of GridCell<Set>
   * @return {[GridCell<Set>]}
   */
  get collisions() {
    const items = [];
    for (const [key, cell] of this.data) {
      // items.push(key);
      if (cell.size > 1) {
        const [x ,y] = fromKey(key);
        items.push(new GridCell(x, y, Array.from(cell)));
      }
    }
    return items;
  }

  /**
   * Returns true if there are collisions.
   * @return {Boolean}
   */
  get hasCollisions() {
    return this.collisions.length > 0;
  }

  /**
   * Returns True if there is a value at position
   * @param  {Number}  x
   * @param  {Number}  y
   * @return {Boolean}
   */
  has(x, y) {
    const key = getKey(x, y);
    return this.data.has(key);
  }

  /**
   * Returns the item at the grid location.
   * @param  {Number} x
   * @param  {Number} y
   * @return {Set<Object> | null}
   */
  at(x, y) {
    const key = getKey(x, y);
    if (this.data.has(key)) {
      return this.data.get(key);
    }
    return null;
  }

  /**
   * Adds the CodeSymbol to the grid at x,y
   * @param {Number} x
   * @param {Number} y
   * @param {Object} symbol
   */
  add(x, y, symbol) {
    const key = getKey(x, y);
    const symbols = this.data.get(key) ?? new Set();
    symbols.add(symbol);
    this.data.set(key, symbols);
  }

  delete(x, y) {
    if (!this.has(x, y)) { return; }
    const key = getKey(x, y);
    this.data.delete(key);
  }

  /**
   * Returns the Grid as 2D Array stringified.
   * @return {String}
   */
  toString() {
    return JSON.stringify(this.to2DArray(), (key, value) => {
      if (value instanceof CodeSymbol) {
        return value.toString();
      }
      return value;
    });
  }

  toJSON() {
    return this.to2DArray({
      shouldStringifyValue: true,
    });
  }

  /**
   * Returns the Grid as a 2D array.
   * @return {[[Object]]}
   */
  to2DArray({shouldStringifyValue = false}) {
    const grid2d = [];
    for (let y = 0; y < this.height; y++) {
      grid2d[y] = [];
      for (let x = 0; x < this.width; x++) {
        if (this.has(x, y)) {
          if (shouldStringifyValue) {
            const vals = Array.from(this.at(x, y));
            if (vals.length > 1) {
              grid2d[y][x] = vals.map(c => c.toString());
            } else {
              grid2d[y][x] = vals[0].toString();
            }
          } else {
            grid2d[y][x] = Array.from(this.at(x, y));
          }
        } else {
          grid2d[y][x] = null;
        }
      }
    }
    return grid2d;
  }
}
