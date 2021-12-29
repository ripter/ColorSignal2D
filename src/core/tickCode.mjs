import { Grid } from './Grid.mjs';
import { fromKey } from './getKey.mjs';

/**
 * Performs a single Tick on the codeGrid.
 * Returns a new codeGrid from the result of the tick.
 * @param  {Object} RULES
 * @param  {Grid} grid
 * @return {Grid}
 */
export function tickCode(RULES, grid) {
  const nextGrid = new Grid(grid.width, grid.height);

  //
  // Tick all the symbols
  for (const [key, cells] of grid.data.entries()) {
    const [x, y] = fromKey(key);
    for (const cell of cells) {
      const { symbol } = cell;
      const { tick } = RULES[symbol];

      if (tick) {
        // tick returns a set of cells to add.
        tick(x, y, cell, grid).forEach((c) => nextGrid.add(c.x, c.y, c.value));
      } else {
        // without a tick, just keep the symbol where it is.
        nextGrid.add(x, y, cell);
      }
    }
  }

  //
  // Resolve all the collisions.
  while (nextGrid.hasCollisions) {
    nextGrid.collisions.forEach((cell) => {
      const collisions = [...cell.value];
      collisions.sort((a, b) => RULES[b.symbol].collidePriority - RULES[a.symbol].collidePriority);
      const collide1 = collisions.shift();

      // Clear out the old values, we will replace with with the collision result.
      nextGrid.delete(cell.x, cell.y);
      // Call collide and merge the results back into the map.
      RULES[collide1.symbol]
        .collide(cell.x, cell.y, collide1, collisions)
        .forEach((c) => nextGrid.add(c.x, c.y, c.value));
    });
  }

  return nextGrid;
}
