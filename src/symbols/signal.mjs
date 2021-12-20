/**
 * Signal Symbol
 * Moves in a direction carrying a color value.
 * Triggers a collision when it collides with another Symbol.
 * Alpha Config:
 *   0b0001 - North 0x01
 *   0b0010 - South 0x02
 *   0b0100 - East 0x04
 *   0b1000 - West 0x08
 */

import { getAlpha } from '../utils/getAlpha.mjs';

const NORTH = 0b0001;
const SOUTH = 0b0010;
const EAST = 0b0100;
const WEST = 0b1000;

/**
 * Performs a tick, moving the signal in a direction.
 * @param  {[type]} position               [description]
 * @param  {[type]} cell                   [description]
 * @param  {[type]} codeGrid               [description]
 * @return {[type]}          [description]
 */
export function tick(position, cell, codeGrid) {
  const [width, height] = [codeGrid[0].length, codeGrid.length];
  const { x, y } = position;
  const { A } = cell;
  const changeset = [];
  // const oldSignal = codeGrid[y][x];
  // const config = getAlpha(color);
  const delta = {
    x: 0, y: 0,
  };

  // Get the direction from the config.
  if (A === NORTH) {
    delta.y -= 1;
  } else if (A === SOUTH) {
    delta.y += 1;
  } else if (A === EAST) {
    delta.x += 1;
  } else if (A === WEST) {
    delta.x -= 1;
  }

  // Remove it from the old position.
  changeset.push({
    ...position,
    cell: null,
  });
  // Add the cell in the new position.
  changeset.push({
    x: x + delta.x,
    y: y + delta.y,
    cell,
  });

  return changeset;
}
