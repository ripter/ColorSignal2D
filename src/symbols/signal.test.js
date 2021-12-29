import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { collide, tick } from './signal.mjs';
import { FLAG } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';

describe('CodeSymbol: * ', () => {
  describe('tick(position, cell, codeGrid)', () => {
    it('moves North', () => {
      const cell = new CodeSymbol('*', 0xF0, 0x12, 0xBE, FLAG.NORTH);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(1, 0, cell),
      ]);
    });

    it('moves South', () => {
      const cell = new CodeSymbol('*', 0xF0, 0x12, 0xBE, FLAG.SOUTH);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(1, 2, cell),
      ]);
    });

    it('moves East', () => {
      const cell = new CodeSymbol('*', 0xF0, 0x12, 0xBE, FLAG.EAST);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(2, 1, cell),
      ]);
    });

    it('moves West', () => {
      const cell = new CodeSymbol('*', 0xF0, 0x12, 0xBE, FLAG.WEST);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(0, 1, cell),
      ]);
    });
  });

  describe('collide', () => {
    it('merges collide2 color into collide1', () => {
      const actual = collide(
        1,
        1,
        new CodeSymbol('*', 0x00, 0x00, 0x00, FLAG.SOUTH),
        [
          new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.NORTH),
        ],
      );
      assert.equal(actual.length, 1, 'Everything should merge together.');
      assert.deepEqual(actual[0], new GridCell(1, 1, new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.SOUTH)));
    });

    it('merge works on many colors', () => {
      const actual = collide(
        1,
        1,
        new CodeSymbol('A', 0x00, 0xFF, 0x00, FLAG.EAST),
        [
          new CodeSymbol('B', 0x00, 0x00, 0xFF, FLAG.NORTH | FLAG.SET),
          new CodeSymbol('B', 0xFF, 0x00, 0xFF, FLAG.SOUTH),
        ],
      );
      assert.equal(actual.length, 1, 'Everything should merge together.');
      assert.deepEqual(actual[0], new GridCell(1, 1, new CodeSymbol('A', 0xFF, 0xFF, 0xFF, FLAG.EAST)));
    });
  });
});
