import { colorFromColor } from '../utils/colorFromColor.mjs';
import { fromKey } from './getKey.mjs';

/**
 Renders each cell on the Grid as Text.
 */
export function renderCode(ctx, cellWidth, cellHeight, grid) {
  const maxHeight = grid.height * cellHeight;
  const maxWidth = grid.width * cellWidth;
  // Clear the area we will draw on.
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, maxWidth, maxHeight);

  // Draw a grid
  ctx.beginPath();
  ctx.strokeStyle = '#ff0';
  for (let x = cellWidth; x < maxWidth; x += cellWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, maxHeight);
  }
  for (let y = cellHeight; y < maxHeight; y += cellHeight) {
    ctx.moveTo(0, y);
    ctx.lineTo(maxWidth, y);
  }
  ctx.closePath();
  ctx.stroke();

  // Draw each symbol
  for (const [key, cells] of grid.data) {
    const [x, y] = fromKey(key);
    for (const cell of cells) {
      const { symbol } = cell;
      const color = colorFromColor(cell);

      if (color === '#000000') {
        ctx.strokeStyle = '#FFFFFF';
        ctx.strokeText(symbol, x * cellWidth, (y + 1) * cellHeight);
      } else {
        ctx.fillStyle = color;
        ctx.fillText(symbol, x * cellWidth, (y + 1) * cellHeight);
      }
    }
  }

  // for (let y = 0; y < codeGrid.length; y += 1) {
  //   for (let x = 0; x < codeGrid[0].length; x += 1) {
  //     const cell = codeGrid[y][x];
  //     if (!cell) { continue; } // Skip if there is no data at this position.
  //     const { symbol } = cell;
  //     const color = colorFromColor(cell);
  //
  //     if (color === '#000000') {
  //       ctx.strokeStyle = '#FFFFFF';
  //       ctx.strokeText(symbol, x * cellWidth, (y + 1) * cellHeight);
  //     } else {
  //       ctx.fillStyle = color;
  //       ctx.fillText(symbol, x * cellWidth, (y + 1) * cellHeight);
  //     }
  //   }
  // }
}
