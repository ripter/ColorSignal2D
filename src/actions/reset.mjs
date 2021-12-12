import { loadCodeFile } from '../utils/loadCodeFile.mjs';
import { renderCode } from '../renderCode.mjs';
import { FONT_SIZE } from '../consts/font.mjs';

/**
 * Resets window.code back to the hardcoded default.
*/
export function reset() {
  window.code = loadCodeFile(window.CODE_FILE);
  renderCode(window.ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, window.code);
}
