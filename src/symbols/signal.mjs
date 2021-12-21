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
const NORTH = 0b0001;
const SOUTH = 0b0010;
const EAST = 0b0100;
const WEST = 0b1000;

/**
 * Performs a tick, moving the signal in a direction.
 * @param  {{x, y}} position - Cell's position in the code grid.
 * @param  {Cell} cell - The cell at position in the code grid.
 * @param  {[[Cell]]} codeGrid - Grid running the code.
 * @return {[[Cell]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  const { A } = cell;
  const changeset = [];
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

 // *

/**
 *  When two signals collide, merge collide2 into collide1
 * @param  {Cell} collide1
 * @param  {Cell} collide2
 * @return {Cell} Cell to place at position after collision.
 */
export function collide(collide1, collide2) {

  // Merge in the RGB colors from the other signal.
  collide1.R = collide1.R + collide2.R;
  collide1.G = collide1.G + collide2.G;
  collide1.B = collide1.B + collide2.B;

  return collide1;
}
