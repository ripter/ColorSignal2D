/**
 * Flags sorted on ALpha channel.
 */
export const FLAG = {
  NORTH: 0b00000001,
  SOUTH: 0b00000010,
  EAST: 0b00000100,
  WEST: 0b00001000,
  SET: 0b00010000,
};

/**
 * Returns true if the cell's alpha value has all the flags.
 * @param  {byte}  flags
 * @param  {Symbol}  cell
 * @return {Boolean}
 */
export function hasFlag(flag, cell) {
  return !!(cell.A & flag);
}
