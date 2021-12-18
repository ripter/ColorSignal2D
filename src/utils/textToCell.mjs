// const RGB = 0xFFFFFF00;
// const A = 0x000000FF;

export function textToCell(rawText) {
  const split = rawText.split('#');
  const color = split.length === 2 ? split[1] : 'FFFFFF00';

  // if (split.length === 2) {
  //   const rawColor = split[1];
  //   if (rawColor.length === 6) {
  //     color = parseInt(split[1], 16);
  //   }
  //   else if (rawColor.length === 8) {
  //     color = parseInt(split[1], 16);// & 0xFFFFFF00;
  //     // alpha = color & 0x000000FF;
  //     // color = color & 0xFFFFFF00;
  //   }
  //   else {
  //     throw Error ('Unknown color format');
  //   }
  // }

  return {
    symbol: split[0] ?? null,
    R: parseInt(color.substring(0, 2), 16),
    G: parseInt(color.substring(2, 4), 16),
    B: parseInt(color.substring(4, 6), 16),
    A: color.length === 8 ? parseInt(color.substring(6, 8), 16) : 0x00,
  };
}
