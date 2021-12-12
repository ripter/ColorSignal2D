/**
 * North Signal.
 * Every Tick, moves one cell to the north if it is empty.
 * Triggers collision with symbol if the north cell is occupied.
 */
export function N_tick(x, y, color, codeGrid) {
  console.log('N is tick', x, y, color, codeGrid);
  // Move North, if we can.
  if (y > 0) {
    codeGrid[y - 1][x] = codeGrid[y][x];
  }

  // Clear the old.
  codeGrid[y][x] = null;
}

export const N = {
  tick: N_tick,
};
