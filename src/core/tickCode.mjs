// import { inBounds } from '../utils/inBounds.mjs';
import { Grid } from './Grid.mjs';
import { GridCell } from './GridCell.mjs';
import { fromKey } from './getKey.mjs';

export function tickCode(RULES, codeMap) {
  // Create a new map to hold the code state.
  const nextGrid = new Grid(codeMap.width, codeMap.heigth);
  // the grid is y,x so the box needs to be height,widht for bounds checking.
  // const isCodeSymbolInBounds = inBounds.bind(null, [0, 0, codeMap.width, codeMap.heigth]);

  //
  // Tick all the symbols
  for (const [key, cells] of codeMap.data.entries()) {
    for (const cell of cells) {
      const [x, y] = fromKey(key);
      const { symbol } = cell;
      const { tick } = RULES[symbol];

      if (tick) {
        // tick returns a set of cells to add.
        tick(x, y, cell, codeMap).forEach(cell => nextGrid.add(cell.x, cell.y, cell.value));
      } else {
        // without a tick, just keep the symbol where it is.
        nextGrid.add(x, y, cell);
      }
    }
  }

  //
  // Resolve all the collisions.
  while (nextGrid.hasCollisions) {
    // console.log('hasCollisions', nextGrid.hasCollisions);
    // console.log('collisions', nextGrid.collisions);
    nextGrid.collisions.forEach(cell => {
      const collisions = [...cell.value];
      collisions.sort((a, b) => RULES[b.symbol].collidePriority - RULES[a.symbol].collidePriority);
      const collide1 = collisions.shift();

      // Clear out the old values, we will replace with with the collision result.
      nextGrid.delete(cell.x, cell.y);
      // Call collide and merge the results back into the map.
      RULES[collide1.symbol]
        .collide(cell.x, cell.y, collide1, collisions)
        // .map(c => {console.log('c', c); return c; })
        .forEach(c => {
          // console.log('Adding collision result to the map', c);
          nextGrid.add(c.x, c.y, c.value);
        });
    });
  }

  return nextGrid;
}

/**
 * Performs a single Tick on the codeGrid.
 * Returns a new codeGrid from the result of the tick.
 * @param {Object} RULES - functions to run for each symbol.
 * @param  {2DArray} codeGrid
 * @return {2DArray}
 */
export function tickCode2(RULES, codeGrid) {
  const codeMap = new Map();
  const maxHeight = codeGrid.length;
  const maxWidth = codeGrid[0].length;
  // the grid is y,x so the box needs to be height,widht for bounds checking.
  const isCodeSymbolInBounds = inBounds.bind(null, [0, 0, maxHeight, maxWidth]);

  //
  // Loop over each cell in the grid.
  // Thsi creates a new codeMap from all the changes created by the RULES.
  for (let y = 0; y < maxHeight; y += 1) {
    for (let x = 0; x < maxWidth; x += 1) {
      const cell = codeGrid[y][x];
      if (!cell) { continue; } // Skip if there is no data.
      const { symbol } = cell;
      if (!RULES[symbol]) { continue; } // Skip symbols not in the rules.

      // Run the Rule's tick function and get a changeset.
      let changeset = [];
      const { tick } = RULES[symbol];
      if (tick) {
        changeset = tick({ x, y }, codeGrid[y][x], codeGrid);
      } else {
        changeset.push({
          x,
          y,
          cell,
        });
      }

      // Update the grid based on the changeset.
      for (const change of changeset) {
        // skip null cells.
        if (!change.cell) { continue; }
        // skip if the change is out of bounds.
        if (!isCodeSymbolInBounds([change.y, change.x])) { continue; }
        // Combine all the cells in the map by position.
        const key = `${change.y},${change.x}`;
        const symbols = codeMap.get(key) ?? new Set();
        symbols.add(change.cell);
        codeMap.set(key, symbols);
      }
    }
  }

  //
  // Create a new grid with all the changes.
  const nextCodeGrid = [];
  for (let y = 0; y < maxHeight; y += 1) {
    nextCodeGrid[y] = []; // create a new blank row.
    for (let x = 0; x < maxWidth; x += 1) {
      const key = `${y},${x}`;
      // start with empty cell.
      nextCodeGrid[y][x] = null;
      // skip if there is nothing to set at this position.
      if (!codeMap.has(key)) { continue; }

      // Get the collisions and resolve them.
      // If it collided with an existing cell, then that cell becomes collide1
      const collisions = [...codeMap.get(key)];
      collisions.sort((a, b) => RULES[b.symbol].collidePriority - RULES[a.symbol].collidePriority);
      const collide1 = collisions.shift();

      if (collisions.length > 0) {
        nextCodeGrid[y][x] = RULES[collide1.symbol].collide(collide1, collisions);
      } else {
        nextCodeGrid[y][x] = collide1;
      }
    }
  }
  return nextCodeGrid;
}
