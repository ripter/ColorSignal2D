import { colorFromCell } from '../utils/colorFromCell.mjs';
/**
 Renders each cell on the Grid as Text.
 */
export function renderCode(ctx, cellWidth, cellHeight, codeGrid) {
  // Clear the area we will draw on.
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, cellWidth * codeGrid.length, cellHeight * codeGrid[0].length);

  // Draw each symbol
  for (let y = 0; y < codeGrid.length; y += 1) {
    for (let x = 0; x < codeGrid[0].length; x += 1) {
      const cell = codeGrid[y][x];
      if (!cell) { continue; } // Skip if there is no data at this position.
      const { symbol } = cell;
      ctx.fillStyle = colorFromCell(cell);
      ctx.fillText(symbol, x * cellWidth, (y + 1) * cellHeight);
    }
  }
}
