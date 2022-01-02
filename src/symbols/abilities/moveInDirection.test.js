import { assert } from 'chai';

import { FLAG } from '../../consts/flag.mjs';
import { moveInDirection } from './moveInDirection.mjs';
import { GridCell } from '../../core/GridCell.mjs';
import { CodeSymbol } from '../../core/CodeSymbol.mjs';

describe('symbols/abilities/moveInDirection', () => {
  let codeSymbol;
  beforeEach(() => {
    codeSymbol = new CodeSymbol('*', 0xFF, 0x85, 0x1B, 0x00)
  });

  it('subtracts 1 from y for NORTH flag', () => {
    codeSymbol.A = FLAG.NORTH;
    assert.deepEqual(
      moveInDirection(new GridCell(1, 1, codeSymbol)),
      new GridCell(1, 0, codeSymbol)
    );
  });
  it('adds 1 to y for SOUTH flag', () => {
    codeSymbol.A = FLAG.SOUTH;
    assert.deepEqual(
      moveInDirection(new GridCell(1, 1, codeSymbol)),
      new GridCell(1, 2, codeSymbol)
    );
  });
  it('subtracts 1 from x for WEST flag', () => {
    codeSymbol.A = FLAG.WEST;
    assert.deepEqual(
      moveInDirection(new GridCell(1, 1, codeSymbol)),
      new GridCell(0, 1, codeSymbol)
    );
  });
  it('adds 1 to x for EAST flag', () => {
    codeSymbol.A = FLAG.EAST;
    assert.deepEqual(
      moveInDirection(new GridCell(1, 1, codeSymbol)),
      new GridCell(2, 1, codeSymbol)
    );
  });
});
