/**
 * Returns just the Alpha value from the color number.
 * @param  {Number} rgba
 * @return {Number}
 */
export function getAlpha(rgba) {
  return rgba & 0x000000FF;
}
