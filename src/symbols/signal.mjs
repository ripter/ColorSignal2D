/**
 * Signal Symbol
 * Moves in a direction carrying a color value.
 * Triggers a collision when it collides with another Symbol.
 * Alpha Config:
 *   0b0001 - North
 *   0b0010 - South
 *   0b0100 - East
 *   0b1000 - West
 */

import { getAlpha } from '../utils/getAlpha.mjs';

const NORTH = 0b0001;
const SOUTH = 0b0010;
const EAST = 0b0100;
const WEST = 0b1000;


export function tick(x, y, color, codeGrid) {
  const oldSignal = codeGrid[y][x];
  const config = getAlpha(color);
  let delta = {
    x: 0, y: 0,
  }

  // Get the direction from the config.
  if (config === NORTH) {
    delta.y -= 1;
  }
  else if (config === SOUTH) {
    delta.y += 1;
  }
  else if (config === EAST) {
    delta.x += 1;
  }
  else if (config === WEST) {
    delta.x -= 1;
  }

  // Remove it from the old position.
  codeGrid[y][x] = null;
  //
  // if the delta would move off the grid, cancel instead.
  if (x + delta.x < 0 || y + delta.y < 0) { return; }
  if (x + delta.x >= codeGrid[y].length || y + delta.y >= codeGrid.length) { return; }
  //
  // console.log('y+deltaY', y + deltaY, 'x+deltaX', x + deltaX, 'oldSignal', oldSignal);
  // Move in the direction.
  codeGrid[y + delta.y][x + delta.x] = oldSignal;
  return codeGrid;
}
