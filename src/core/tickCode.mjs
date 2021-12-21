import { inBounds } from '../utils/inBounds.mjs';

/**
 * Performs a single Tick on the codeGrid.
 * Returns a new codeGrid from the result of the tick.
 * @param {Object} RULES - functions to run for each symbol.
 * @param  {2DArray} codeGrid
 * @return {2DArray}
 */
export function tickCode(RULES, codeGrid) {
  const nextCodeGrid = JSON.parse(JSON.stringify(codeGrid));
  const maxHeight = codeGrid.length;
  const maxWidth = codeGrid[0].length;
  // the grid is y,x so the box needs to be height,widt for bounds checking.
  const isCellInBounds = inBounds.bind(null, [0, 0, maxHeight, maxWidth]);

  // Loop over each cell in the grid.
  for (let y = 0; y < maxHeight; y += 1) {
    for (let x = 0; x < maxWidth; x += 1) {
      const cell = codeGrid[y][x];
      if (!cell) { continue; } // Skip if there is no data.
      const { symbol } = cell;
      if (!RULES[symbol]) { continue; } // Skip symbols not in the rules.
      // Run the Rule's tick function and get a changeset.
      const changeset = RULES[symbol].tick({ x, y }, codeGrid[y][x], codeGrid);

      // Update the grid based on the changeset.
      for (const change of changeset) {
        // skip if the change is out of bounds.
        if (!isCellInBounds([change.y, change.x])) { continue; }
        // Check for existing cell.
        const collide1 = nextCodeGrid[change.y][change.x];
        const collide2 = changeset.cell;

        if (collide1 && collide2) {
          change.cell = RULES[collide1.symbol]?.collide(collide1, collide2);
        }

        // Assign the cell to the grid.
        nextCodeGrid[change.y][change.x] = change.cell;
      }
    }
  }
  return nextCodeGrid;
}
