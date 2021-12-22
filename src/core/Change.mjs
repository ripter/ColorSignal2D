
/**
 * A Change to a code grid.
 * @type {Change}
 */
export class Change {
  constructor(x, y, cell) {
    this.x = x;
    this.y = y;
    this.cell = cell;
  }

  /**
   * Returns a deep clone of this Change
   * @return {Change}
   */
  clone() {
    return new Change(this.x, this.y, this.cell.clone());
  }
}
