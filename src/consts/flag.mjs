/**
 * Flags sorted on ALpha channel.
 */
export const FLAG = {
  NORTH: 0b00000001,  // 0x01
  SOUTH: 0b00000010,  // 0x02
  EAST: 0b00000100,   // 0x04
  WEST: 0b00001000,   // 0x08
  SET: 0b00010000,    // 0x10
};

/**
 * Returns true if the cell's alpha value has all the flags.
 * @param  {byte}  flags
 * @param  {CodeSymbol}  cell
 * @return {Boolean}
 */
export function hasFlag(flag, cell) {
  return !!(cell.A & flag);
}
