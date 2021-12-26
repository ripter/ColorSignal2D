import { Symbol } from '../core/Symbol.mjs';
import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';

/**
 * On collision, Symbol Color is added to self Color
 * @param  {Symbol} self
 * @param  {[Symbol]} collisions
 * @return {Symbol}
 */

/**
 * Performs a tick, emitting two signals if there is an Alpha value.
 * @param  {{x, y}} position - Symbol's position in the code grid.
 * @param  {Symbol} cell - The cell at position in the code grid.
 * @param  {[[Symbol]]} codeGrid - Grid running the code.
 * @return {[[Symbol]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  // Skip if there is no Alpha value.
  if (!cell.A) { return [new Change(x, y, cell)]; }
  const signalA = new Change(x, y, new Symbol('*', cell.R, cell.G, cell.B, cell.A));
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
    new Change(x, y, new Symbol(cell.symbol, 0x00, 0x00, 0x00, 0x00)),
    signalA,
    signalB,
  ];
}

export default {
  tick,
  collidePriority: 1, // Common priority in collision.
};
