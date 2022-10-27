import { CodeSymbol } from '../core/CodeSymbol.mjs';

/**
 * Converts symbol#RGBA into a CodeSymbol
 * @param  {String} rawText
 * @return {CodeSymbol}
 */
export function textToCodeSymbol(rawText) {
  let token = rawText.trim();
  let color = '00000000';

  if (token.length > 1) {
    const match = /(.)#([0-9a-fA-F]*)/.exec(token);
    token = match[1];
    color = match[2];
  }

  return new CodeSymbol(
    token,
    // Convert each pair of chars as an 8bit hex value.
    parseInt(color.substring(0, 2), 16), // Red
    parseInt(color.substring(2, 4), 16), // Green
    parseInt(color.substring(4, 6), 16), // Blue
    // Alpha is optional.
    color.length === 8 ? parseInt(color.substring(6, 8), 16) : 0x00,
  );
}
