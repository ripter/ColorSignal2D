import { Change } from '../core/Change.mjs';
import {
  EAST, NORTH, SOUTH, WEST,
} from './signal.mjs';

export function tick(position, cell) {
  const { x, y } = position;
  const self = new Change(x, y, cell);
  // Skip if there is no Alpha value.
  if (!cell.A) { return [self]; }
  const signal = self.clone();

  // use the correct symbol for the signal
  signal.cell.symbol = '*';

  // Use the direction to set the two signals.
  switch (self.cell.A) {
    case NORTH:
      signal.y += 1;
      signal.cell.A = SOUTH;
      break;
    case SOUTH:
      signal.y -= 1;
      signal.cell.A = NORTH;
      break;
    case EAST:
      signal.x -= 1;
      signal.cell.A = WEST;
      break;
    case WEST:
      signal.x += 1;
      signal.cell.A = EAST;
      break;
    default:
      //  ignore
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
