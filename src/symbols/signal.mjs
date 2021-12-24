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
 * @param  {{x, y}} position - Signal's position in the code grid.
 * @param  {Signal} cell - The cell at position in the code grid.
 * @param  {[[Signal]]} codeGrid - Grid running the code.
 * @return {[[Signal]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  const self = new Change(x, y, cell);

  // Get the direction from the config.
  if (hasFlag(FLAG.NORTH, cell)) {
    self.y -= 1;
  } else if (hasFlag(FLAG.SOUTH, cell)) {
    self.y += 1;
  } else if (hasFlag(FLAG.EAST, cell)) {
    self.x += 1;
  } else if (hasFlag(FLAG.WEST, cell)) {
    self.x -= 1;
  }

  return [self];
}

/**
 *  When two signals collide, merge collide2 into collide1
 * @param  {Signal} collide1
 * @param  {Signal} collide2
 * @return {Signal} Signal to place at position after collision.
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
