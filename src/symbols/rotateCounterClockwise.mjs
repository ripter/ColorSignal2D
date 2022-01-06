import { absorb } from './abilities/absorb.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { moveInDirection } from './abilities/moveInDirection.mjs';

const {
  NORTH, SOUTH, EAST, WEST,
} = FLAG;

export function tick(x, y, self) {
  // skip if we don't have an alpha value set.
  if (self.A === 0) {
    return [new GridCell(x, y, self)];
  }

  // Rotate the direction clockwise.
  if (hasFlag(NORTH, self)) {
    self.A = WEST;
  } else if (hasFlag(EAST, self)) {
    self.A = SOUTH;
  } else if (hasFlag(SOUTH, self)) {
    self.A = EAST;
  } else if (hasFlag(WEST, self)) {
    self.A = NORTH;
  }

  const signal = self.clone();
  signal.symbol = '*';

  return [
    new GridCell(x, y, self.clear()),
    moveInDirection(new GridCell(x, y, signal)),
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
