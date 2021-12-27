import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';

/**
 * On collision, CodeSymbol Color is added to self Color
 * @param  {CodeSymbol} self
 * @param  {[CodeSymbol]} collisions
 * @return {CodeSymbol}
 */

/**
 * Performs a tick, emitting two signals if there is an Alpha value.
 * @param  {{x, y}} position - CodeSymbol's position in the code grid.
 * @param  {CodeSymbol} cell - The cell at position in the code grid.
 * @param  {[[CodeSymbol]]} codeGrid - Grid running the code.
 * @return {[[CodeSymbol]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  // Skip if there is no Alpha value.
  if (!cell.A) { return [new GridCell(x, y, cell)]; }
  const signalA = new GridCell(x, y, new CodeSymbol('*', cell.R, cell.G, cell.B, cell.A));
  const signalB = signalA.clone();

  // Use the direction to set the two signals.
  if (hasFlag(FLAG.NORTH, cell)) {
    signalA.y -= 1;
    signalB.x += 1;
    signalB.cell.A = FLAG.EAST;
  } else if (hasFlag(FLAG.SOUTH, cell)) {
    signalA.y += 1;
    signalB.x -= 1;
    signalB.cell.A = FLAG.WEST;
  } else if (hasFlag(FLAG.EAST, cell)) {
    signalA.x += 1;
    signalB.y += 1;
    signalB.cell.A = FLAG.SOUTH;
  } else if (hasFlag(FLAG.WEST, cell)) {
    signalA.x -= 1;
    signalB.y -= 1;
    signalB.cell.A = FLAG.NORTH;
  }

  return [
    // replace self with a cleared data version.
    new GridCell(x, y, new CodeSymbol(cell.symbol, 0x00, 0x00, 0x00, 0x00)),
    signalA,
    signalB,
  ];
}

export default {
  tick,
  collidePriority: 1, // Common priority in collision.
};
