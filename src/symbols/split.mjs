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

export default {
  collide,
}
