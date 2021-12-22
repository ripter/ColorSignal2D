import { Cell } from '../core/Cell.mjs'
import { Change } from '../core/Change.mjs';
import { NORTH, SOUTH, EAST, WEST } from './signal.mjs';


/**
 * On collision, Signal Color is added to self Color
 * @param  {Cell} self
 * @param  {[Cell]} collisions
 * @return {Cell}
 */
export function collide(self, ...collisions) {

  for (const cell of collisions) {
    self.R += cell.R;
    self.G += cell.G;
    self.B += cell.B;
    self.A += cell.A;
  }

  return self;
}




/**
 * Performs a tick, emitting two signals if there is an Alpha value.
 * @param  {{x, y}} position - Cell's position in the code grid.
 * @param  {Cell} cell - The cell at position in the code grid.
 * @param  {[[Cell]]} codeGrid - Grid running the code.
 * @return {[[Cell]]} A new code grid created from the result of ticking parameters.
 */
export function tick(position, cell) {
  const { x, y } = position;
  // Skip if there is no Alpha value.
  if (!cell.A) { return [new Change(x, y, cell)]; }
  const signalA = new Change(x, y, new Cell('*', cell.R, cell.G, cell.B, cell.A));
  const signalB = signalA.clone();

  // Use the direction to set the two signals.
  switch (signalA.cell.A) {
    case SOUTH:
      signalA.y += 1;
      signalB.x -= 1;
      signalB.cell.A = WEST;
      break;
    case NORTH:
      signalA.y -= 1;
      signalB.x += 1;
      signalB.cell.A = EAST;
      break;
    case EAST:
      signalA.x += 1;
      signalB.y -= 1;
      signalB.cell.A = SOUTH;
      break;
    case WEST:
      signalA.x -= 1;
      signalB.y += 1;
      signalB.cell.A = NORTH;
      break;
  }

  return [
    // replace self with a cleared data version.
    new Change(x, y, new Cell(cell.symbol, 0x00, 0x00, 0x00, 0x00)),
    signalA,
    signalB,
  ];
}

export default {
  collide,
  tick,
}
