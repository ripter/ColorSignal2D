import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';

/**
 * Signal Symbol
 * Moves in a direction carrying a color value.
 * Triggers a collision when it collides with another Symbol.
 * Alpha Config:
 *   0b0001 - North   0x01
 *   0b0010 - South   0x02
 *   0b0100 - East    0x04
 *   0b1000 - West    0x08
 */

/**
 * Performs a tick, moving the signal in a direction.
 * @param  {{x, y}} position - Cell's position in the code grid.
 * @param  {Cell} cell - The cell at position in the code grid.
 * @param  {[[Cell]]} codeGrid - Grid running the code.
 * @return {[[Cell]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  const self = new Change(x, y, cell);

  // Get the direction from the config.
  if (hasFlag(self.cell, FLAG.NORTH)) {
      self.y -= 1;
  } else if (hasFlag(cell, FLAG.SOUTH)) {
      self.y += 1;
  } else if (hasFlag(cell, FLAG.EAST)) {
      self.x += 1;
  } else if (hasFlag(cell, FLAG.WEST)) {
      self.x -= 1;
  }
  
  return [self];
}

/**
 *  When two signals collide, merge collide2 into collide1
 * @param  {Cell} collide1
 * @param  {Cell} collide2
 * @return {Cell} Cell to place at position after collision.
 */
export function collide(collide1, collide2) {
  // Merge in the RGB colors from the other signal.
  collide1.R += collide2.R;
  collide1.G += collide2.G;
  collide1.B += collide2.B;

  return collide1;
}

export default {
  tick,
  collide,
  collidePriority: 0, // lowest priority, use any other collide before this one.
};
