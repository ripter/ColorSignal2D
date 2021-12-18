/**
 * Performs a single Tick on the codeGrid.
 * Returns a new codeGrid from the result of the tick.
 * @param {Object} RULES - functions to run for each symbol.
 * @param  {2DArray} codeGrid
 * @return {2DArray}
 */
export function tickCode(RULES, codeGrid) {
  const nextCodeGrid = JSON.parse(JSON.stringify(codeGrid));
  // Loop over each cell in the grid.
  for (let y = 0; y < codeGrid.length; y++) {
    for (let x = 0; x < codeGrid[0].length; x++) {
      const cell = codeGrid[y][x];
      if (!cell) { continue; } // Skip if there is no data.
      const { symbol, color, config } = cell;
      // Run the Rule's tick function and get a changeset.
      const changeset = RULES[symbol].tick({x, y}, codeGrid[y][x], codeGrid);

      // Update the grid based on the changeset.
      for (let change of changeset) {
        const { x, y, cell } = change;
        nextCodeGrid[y][x] = cell;
      }
    }
  }
  return nextCodeGrid;
}
