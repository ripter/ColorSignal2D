/**
 * A GridCell to a code grid.
 * @type {GridCell}
 */
export class GridCell {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  /**
   * Returns a deep clone of this GridCell
   * @return {GridCell}
   */
  clone() {
    return new GridCell(this.x, this.y, this.value.clone());
  }
}
