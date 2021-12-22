import { FONT_SIZE } from '../consts/font.mjs';
import { loadCodeFile } from '../utils/loadCodeFile.mjs';
import { renderCode } from '../core/renderCode.mjs';

/**
 * Resets window.code back to the hardcoded default.
*/
export function reset() {
  // clear out the output
  window.elmOutput.value = '';
  // Load up the currend CODE_FILE as the runnind code.
  window.code = loadCodeFile(window.CODE_FILE);
  // Render the code on the canvas
  renderCode(window.ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, window.code);
}
