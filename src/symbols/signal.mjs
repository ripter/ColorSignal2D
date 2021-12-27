import { GridCell } from '../core/GridCell.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';

/**
 * CodeSymbol CodeSymbol
 * Moves in a direction carrying a color value.
 * Triggers a collision when it collides with another CodeSymbol.
 * Alpha Config:
 *   0b0001 - North   0x01
 *   0b0010 - South   0x02
 *   0b0100 - East    0x04
 *   0b1000 - West    0x08
 */

/**
 * Performs a tick, moving the signal in a direction.
 * @param {Number} x
 * @param {Number} y
 * @param  {CodeSymbol} codeSymbol
 * @return {[GridCell]} Returns a list of grid cells.
 */
export function tick(x, y, codeSymbol) {
  const self = new GridCell(x, y, codeSymbol);

  // Get the direction from the config.
  if (hasFlag(FLAG.NORTH, codeSymbol)) {
    self.y -= 1;
  } else if (hasFlag(FLAG.SOUTH, codeSymbol)) {
    self.y += 1;
  } else if (hasFlag(FLAG.EAST, codeSymbol)) {
    self.x += 1;
  } else if (hasFlag(FLAG.WEST, codeSymbol)) {
    self.x -= 1;
  }

  return [self];
}

/**
 *  When two signals collide, merge collide2 into collide1
 * @param  {CodeSymbol} collide1
 * @param  {CodeSymbol} collide2
 * @return {CodeSymbol} CodeSymbol to place at position after collision.
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
