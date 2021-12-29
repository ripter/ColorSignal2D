import { absorb } from './abilities/absorb.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';

/**
 * Mirror, reflects signals back the direction they came from.
 * @param {Number} x
 * @param {Number} y
 * @param  {CodeSymbol} codeSymbol
 * @return {[GridCell]} Returns a list of grid cells.
 */
export function tick(x, y, codeSymbol) {
  const self = new GridCell(x, y, codeSymbol);
  // Skip if there is no Alpha value.
  if (!codeSymbol.A) { return [self]; }
  // Create a Signal from our color value.
  const signal = self.clone();
  signal.value.symbol = '*';

  // Use the direction to set the two signals.
  if (hasFlag(FLAG.NORTH, codeSymbol)) {
    signal.y += 1;
    signal.value.A = FLAG.SOUTH;
  } else if (hasFlag(FLAG.SOUTH, codeSymbol)) {
    signal.y -= 1;
    signal.value.A = FLAG.NORTH;
  } else if (hasFlag(FLAG.EAST, codeSymbol)) {
    signal.x -= 1;
    signal.value.A = FLAG.WEST;
  } else if (hasFlag(FLAG.WEST, codeSymbol)) {
    signal.x += 1;
    signal.value.A = FLAG.EAST;
  }

  // reset self.
  codeSymbol.clear();

  return [
    self,
    signal,
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
  collidePriority: 1, // Average priority
};
