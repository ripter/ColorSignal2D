

/**
 * Cell value used in a code grid.
 * Contains a Symbol and (RGBA) Color.
 * @type {Cell}
 */
export class Cell {
  constructor(symbol, R, G, B, A) {
    this.symbol = symbol;
    this.data = new Uint8ClampedArray([R, G, B, A]);
  }

  get R() {
    return this.data[0];
  }
  get G() {
    return this.data[1];
  }
  get B() {
    return this.data[2];
  }
  get A() {
    return this.data[3];
  }
}
