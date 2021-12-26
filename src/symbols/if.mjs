import { Symbol } from '../core/Symbol.mjs';
import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { absorb } from './abilities/absorb.mjs';

export function collide(self, collisions) {
  const setSymbols = collisions.filter(hasFlag.bind(null, FLAG.SET));

  // Reset to the set signal.
  if (setSymbols.length > 0) {
    self.clear(); // clear out any existing value.
    absorb(self, setSymbols); // absorb all of the set values.
    self.A = 0; // clear the alpha color.
  }

  return self;
}

export function tick(position, cell) {

}

export default {
  collide,
  // tick,
  collidePriority: 100, // Higher priority in collision.
};
