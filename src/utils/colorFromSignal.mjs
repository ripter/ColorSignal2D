/**
 * Returns val with format 0xXX.
 * @param  {8-bit byte} val               [description]
 * @return {string}     [description]
 */
function padValue(val) {
  return (val < 0x0F ? '0' : '') + (val === 0 ? '0' : val.toString(16));
}

/**
 * Returns a CSS Color String from the cell's R,G,B values.
 * @param  {{R, G, B}} cell
 * @return {String}
 */
export function colorFromSignal(cell) {
  const R = padValue(cell.R);
  const G = padValue(cell.G);
  const B = padValue(cell.B);
  return `#${R}${G}${B}`.toUpperCase();
}
