import { colorFromColor } from '../utils/colorFromColor.mjs';

/**
 * CodeSymbol value used in a code grid.
 * Contains a CodeSymbol and (RGBA) Color.
 * @type {CodeSymbol}
 */
export class CodeSymbol {
  constructor(symbol, R, G, B, A) {
    this.symbol = symbol;
    this.data = new Uint8ClampedArray([R, G, B, A]);
  }

  /**
   * Returns a new CodeSymbol with the same values as this CodeSymbol.
   */
  clone() {
    return new CodeSymbol(this.symbol, this.R, this.G, this.B, this.A);
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

  /**
   * Returns the CodeSymbol in a string format.
   * @return {String} - *#RRGGBBAA
   */
  toString() {
    return this.symbol + colorFromColor(this, true);
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

// window.CodeSymbol = CodeSymbol;
