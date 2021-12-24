import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';

export function tick(position, cell) {
  const { x, y } = position;
  const self = new Change(x, y, cell);
  // Skip if there is no Alpha value.
  if (!cell.A) { return [self]; }
  const signal = self.clone();

  // use the correct symbol for the signal
  signal.cell.symbol = '*';

  // Use the direction to set the two signals.
  if (hasFlag(FLAG.NORTH, cell)) {
      signal.y += 1;
      signal.cell.A = FLAG.SOUTH;
  } else if (hasFlag(FLAG.SOUTH, cell)) {
      signal.y -= 1;
      signal.cell.A = FLAG.NORTH;
  } else if (hasFlag(FLAG.EAST, cell)) {
      signal.x -= 1;
      signal.cell.A = FLAG.WEST;
  } else if (hasFlag(FLAG.WEST, cell)) {
      signal.x += 1;
      signal.cell.A = FLAG.EAST;
  }

  // reset self.
  cell.clear();

  return [
    self,
    signal,
  ];
}

export default {
  tick,
  collidePriority: 1, // Average priority
};
