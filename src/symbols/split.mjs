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
 * @param {Number} x
 * @param {Number} y
 * @param  {CodeSymbol} codeSymbol
 * @return {[GridCell]} Returns a list of grid cells.
 */
export function tick(x, y, codeSymbol) {
  // Skip if there is no Alpha value.
  if (!codeSymbol.A) { return [new GridCell(x, y, codeSymbol)]; }

  // Create the two signals
  const signalA = new GridCell(x, y, codeSymbol.clone());
  signalA.value.symbol = '*';
  const signalB = signalA.clone();

  // Use the direction to set the two signals.
  if (hasFlag(FLAG.NORTH, codeSymbol)) {
    signalA.y -= 1;
    signalB.x += 1;
    signalB.value.A = FLAG.EAST;
  } else if (hasFlag(FLAG.SOUTH, codeSymbol)) {
    signalA.y += 1;
    signalB.x -= 1;
    signalB.value.A = FLAG.WEST;
  } else if (hasFlag(FLAG.EAST, codeSymbol)) {
    signalA.x += 1;
    signalB.y += 1;
    signalB.value.A = FLAG.SOUTH;
  } else if (hasFlag(FLAG.WEST, codeSymbol)) {
    signalA.x -= 1;
    signalB.y -= 1;
    signalB.value.A = FLAG.NORTH;
  }

  // Reset ourself.
  codeSymbol.clear();
  return [
    // replace self with a cleared data version.
    new GridCell(x, y, codeSymbol),
    signalA,
    signalB,
  ];
}

export default {
  tick,
  collidePriority: 1, // Common priority in collision.
};
