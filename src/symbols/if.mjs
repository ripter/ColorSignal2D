import { absorb } from './abilities/absorb.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { moveInDirection } from './abilities/moveInDirection.mjs';

export function collide(x, y, self, collisions) {
  // Get the signals with the SET Flag.
  const setSymbols = collisions.filter(hasFlag.bind(null, FLAG.SET));
  // Get the signals that do not have have the SET flag.
  const collisionSignals = collisions.filter((codeSymbol) => !hasFlag(FLAG.SET, codeSymbol));
  const signal = collisionSignals.shift();
  // if there is more than one collision, merge them together.
  if (collisionSignals.length > 0) {
    absorb(signal, collisionSignals);
  }
  // Check if the collision signal passed the filter.
  const passesTest = signal && (self.R & signal.R) && (self.G & signal.G) && (self.B & signal.B);

  // Reset to the set signal.
  if (setSymbols.length > 0) {
    self.clear(); // clear out any existing value.
    absorb(self, setSymbols); // absorb all of the set values.
    self.A = 0; // clear the alpha color.
  }

  return [
    new GridCell(x, y, self),
    passesTest ? moveInDirection(new GridCell(x, y, signal)) : null,
  ].filter((a) => a != null);
}

export default {
  collide,
  collidePriority: 100, // Higher priority in collision.
};
