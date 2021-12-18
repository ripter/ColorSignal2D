import { FONT_SIZE } from '../consts/font.mjs';
import { loadCodeFile } from '../utils/loadCodeFile.mjs';
import { renderCode } from '../core/renderCode.mjs';

/**
 * Resets window.code back to the hardcoded default.
*/
export function reset() {
  window.code = loadCodeFile(window.CODE_FILE);
  renderCode(window.ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, window.code);
}
