import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { FLAG } from '../consts/flag.mjs';
import { tick } from './rotateClockwise.mjs';

describe('symbols/rotateClockwise', () => {
  it('NORTH becomes EAST', () => {
    const actual = tick(1, 1, new CodeSymbol('/', 0xFF, 0xDC, 0x00, FLAG.NORTH));
    assert.deepEqual(
      actual,
      [
        new GridCell(1, 1, new CodeSymbol('/', 0x00, 0x00, 0x00, 0x00)),
        new GridCell(2, 1, new CodeSymbol('*', 0xFF, 0xDC, 0x00, FLAG.EAST)),
      ],
    );
  });

  it('EAST becomes NORTH', () => {
    const actual = tick(1, 1, new CodeSymbol('/', 0xFF, 0xDC, 0x00, FLAG.EAST));
    assert.deepEqual(
      actual,
      [
        new GridCell(1, 1, new CodeSymbol('/', 0x00, 0x00, 0x00, 0x00)),
        new GridCell(1, 0, new CodeSymbol('*', 0xFF, 0xDC, 0x00, FLAG.NORTH)),
      ],
    );
  });

  it('WEST becomes SOUTH', () => {
    const actual = tick(1, 1, new CodeSymbol('/', 0xFF, 0xDC, 0x00, FLAG.WEST));
    assert.deepEqual(
      actual,
      [
        new GridCell(1, 1, new CodeSymbol('/', 0x00, 0x00, 0x00, 0x00)),
        new GridCell(1, 2, new CodeSymbol('*', 0xFF, 0xDC, 0x00, FLAG.SOUTH)),
      ],
    );
  });

  it('SOUTH becomes WEST', () => {
    const actual = tick(1, 1, new CodeSymbol('/', 0xFF, 0xDC, 0x00, FLAG.SOUTH));
    assert.deepEqual(
      actual,
      [
        new GridCell(1, 1, new CodeSymbol('/', 0x00, 0x00, 0x00, 0x00)),
        new GridCell(0, 1, new CodeSymbol('*', 0xFF, 0xDC, 0x00, FLAG.WEST)),
      ],
    );
  });
});
