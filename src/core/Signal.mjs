/**
 * Signal value used in a code grid.
 * Contains a Symbol and (RGBA) Color.
 * @type {Signal}
 */
export class Signal {
  constructor(symbol, R, G, B, A) {
    this.symbol = symbol;
    this.data = new Uint8ClampedArray([R, G, B, A]);
  }

  /**
   * Returns a new Signal with the same values as this Signal.
   */
  clone() {
    return new Signal(this.symbol, this.R, this.G, this.B, this.A);
  }

  /**
   * "Clears" the color from the cell by setting everything to 0.
   */
  clear() {
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.A = 0;
    return this;
  }

  get R() {
    return this.data[0];
  }

  set R(val) {
    this.data[0] = val;
  }

  get G() {
    return this.data[1];
  }

  set G(val) {
    this.data[1] = val;
  }

  get B() {
    return this.data[2];
  }

  set B(val) {
    this.data[2] = val;
  }

  get A() {
    return this.data[3];
  }

  set A(val) {
    this.data[3] = val;
  }
}

// window.Signal = Signal;
