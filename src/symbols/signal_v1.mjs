/**
 * Retuns a signalTick function that moves in delta direction.
 */
export function signalTick(deltaX, deltaY) {
  return function tick(x, y, color, codeGrid) {
    const oldSignal = codeGrid[y][x];
    // Remove it from the old position.
    codeGrid[y][x] = null;

    // if the delta would move off the grid, cancel instead.
    if (x + deltaX < 0 || y + deltaY < 0) { return; }
    if (x + deltaX >= codeGrid[y].length || y + deltaY >= codeGrid.length) { return; }

    console.log('y+deltaY', y + deltaY, 'x+deltaX', x + deltaX, 'oldSignal', oldSignal);
    // Move in the direction.
    codeGrid[y + deltaY][x + deltaX] = oldSignal;
  };
}
