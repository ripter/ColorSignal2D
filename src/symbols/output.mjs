
export function collide(self, ...collisions) {
  const OUTPUT = window.OUTPUT || [];

  console.log('output collide', self, collisions);
  // add each color to the output.
  for (const collision of collisions) {
    let chars = [];
    if (collision.R) { chars.push(collision.R); }
    if (collision.G) { chars.push(collision.G); }
    if (collision.B) { chars.push(collision.B); }

    for (const char of chars) {
      OUTPUT.push(String.fromCharCode(char));
    }
  }

  return self;
}

export default {
  collide,
};
