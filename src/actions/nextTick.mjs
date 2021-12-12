import { renderCode } from '../renderCode.mjs';
import { tickCode } from '../tickCode.mjs';
import { FONT, FONT_SIZE } from '../consts/font.mjs';

/**
 Performs a Tick on window.code, overriding the old state.
 Renders the updated code state.
*/
export function nextTick() {
  // Run the next Tick in the simulation.
  // override the code from the last tick.
  window.code = tickCode(window.code);
  // Render the Code to the screen.
  ctx.font = FONT;
  renderCode(window.ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, window.code);
}
