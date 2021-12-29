import { absorb } from './abilities/absorb.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';

/**
 * Returns two signals if there is an Alpha value then clears self.
 * @param {Number} x
 * @param {Number} y
 * @param  {CodeSymbol} codeSymbol
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
    new GridCell(x, y, codeSymbol),
    signalA,
    signalB,
  ];
}

export default {
  tick,
  collide: (x, y, self, collisions) => {
    absorb(self, collisions);
    return [
      new GridCell(x, y, self),
    ];
  },
  collidePriority: 1, // Common priority in collision.
};
