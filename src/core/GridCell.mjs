/**
 * A GridCell to a code grid.
 * @type {GridCell}
 */
export class GridCell {
  constructor(x, y, cell) {
    this.x = x;
    this.y = y;
    this.cell = cell;
  }

  /**
   * Returns a deep clone of this GridCell
   * @return {GridCell}
   */
  clone() {
    return new GridCell(this.x, this.y, this.cell.clone());
  }
}
