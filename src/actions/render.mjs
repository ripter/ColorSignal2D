import { FONT, FONT_SIZE } from '../consts/font.mjs';
import { renderCode } from '../core/renderCode.mjs';

export function render(ctx = window.ctx) {
  // Render the Code to the screen.
  ctx.font = FONT;
  renderCode(ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, window.code);

  // Flush the OUTPUT buffer to the screen.
  window.elmOutput.value += window.OUTPUT.join('');
  window.OUTPUT = [];
}
