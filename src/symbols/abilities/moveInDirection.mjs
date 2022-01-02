import { FLAG, hasFlag } from '../../consts/flag.mjs';

/**
 * Updates the x,y position based on the CodeSymbol Direction.
 * @param  {GridCell} gridCell
 * @return {GridCell}
 */
export function moveInDirection(gridCell) {
  const codeSymbol = gridCell.value;

  if (hasFlag(FLAG.NORTH, codeSymbol)) {
    gridCell.y -= 1;
  } else if (hasFlag(FLAG.SOUTH, codeSymbol)) {
    gridCell.y += 1;
  } else if (hasFlag(FLAG.EAST, codeSymbol)) {
    gridCell.x += 1;
  } else if (hasFlag(FLAG.WEST, codeSymbol)) {
    gridCell.x -= 1;
  }

  return gridCell;
}
