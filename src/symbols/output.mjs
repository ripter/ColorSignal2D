/**
 * Pushes out up to three chars based on RGB values.
 * @param  {Function} callback function called with the char array.
 * @param  {Symbol}   self
 * @param  {[Symbol]}   collisions
 * @return {Symbol} Symbol to survive on the code grid.
 */
export function collide(callback, self, ...collisions) {
  // add each color to the output.
  for (const collision of collisions) {
    const chars = [];
    if (collision.R) { chars.push(collision.R); }
    if (collision.G) { chars.push(collision.G); }
    if (collision.B) { chars.push(collision.B); }

    // Output to the callback.
    callback(chars.map((char) => String.fromCharCode(char)));
  }

  return self;
}

export default {
  collide,
  collidePriority: 100, // Higher priority in collision.
};
