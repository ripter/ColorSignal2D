/**
 * Converts x,y into a key
 * @param  {Number} x
 * @param  {Number} y
 * @return {String}
 */
export function getKey(x, y) {
  return `[${x},${y}]`;
}

/**
 * Comverts a key into [x,y]
 * @param  {String} key
 * @return {[Number, Number]}
 */
export function fromKey(key) {
  return JSON.parse(key);
}
