/**
 * Returns val with format 0xXX.
 * @param  {8-bit byte} val
 * @return {string} 0x00 - 0xFF
 */
export function padValue(val) {
  return (val < 0x0F ? '0' : '') + (val === 0 ? '0' : val.toString(16));
}

/**
 * Returns a CSS Color String from the cell's R,G,B values.
 * @param  {{R, G, B, A}} CodeSymbol
 * @param {Boolean} includeAlpha
 * @return {String}
 */
export function colorFromColor(symbol, includeAlpha = false) {
  const R = padValue(symbol.R);
  const G = padValue(symbol.G);
  const B = padValue(symbol.B);
  const A = padValue(symbol.A ?? 0x00);
  const rgb = `#${R}${G}${B}`.toUpperCase();

  if (!includeAlpha) {
    return rgb;
  }
  return rgb + A;
}
