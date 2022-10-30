import { absorb } from './abilities/absorb.mjs';
import { GridCell } from '../core/GridCell.mjs';

export function collide(x, y, self, collisions) {
  absorb(self, collisions);
  return [
    new GridCell(x, y, self),
  ];
}

export function tick(x, y, self) {
  // Skip if there is no value.
  if ((self.R | self.G | self.B) === 0) {
    return [new GridCell(x, y, self)];
  }

  // convert the color into a single number.
  const value = parseInt( 
    `${self.R.toString(16)}${self.G.toString(16)}${self.B.toString(16)}`,
    16
  );
  self.clear();
  return [
    // new GridCell(x, y, self),
    self,
    new GridCell(x, y, value),
  ];
}

export default {
  tick,
  collide,
  collidePriority: 100,
}
