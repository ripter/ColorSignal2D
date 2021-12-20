/**
 * Returns the Color as a number.
 * @param  {String} colorString
 * @return {Number}
 */
export function asNumber(colorString) {
  return Number.parseInt(colorString.substring(1), 16);
}

export const WHITE = '#FFFFFF';
export const RED = '#FF0000';
export const GREEN = '#00FF00';
export const BLUE = '#0000FF';
