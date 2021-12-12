/**
 Renders each cell on the Grid as Text.
 */
export function renderCode(ctx, cellWidth, cellHeight, codeGrid) {
  ctx.fillStyle = '#000'; // black.
  ctx.fillRect(0, 0, cellWidth * codeGrid.length, cellHeight * codeGrid[0].length);

  for (let y = 0; y < codeGrid.length; y += 1) {
    for (let x = 0; x < codeGrid[0].length; x += 1) {
      const { symbol, color } = codeGrid[y][x] ?? { symbol: null, color: null };
      // skip if there is no symbol.
      if (!symbol) { continue; }
      ctx.fillStyle = color;
      ctx.fillText(symbol, x * cellWidth, (y + 1) * cellHeight);
    }
  }
}
