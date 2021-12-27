import { assert } from 'chai';

import { BLACK, RED, WHITE } from '../consts/colors.mjs';
import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { Grid } from '../core/Grid.mjs';
import { collide, tick } from './signal.mjs';
import { textToCodeSymbol } from '../utils/textToCodeSymbol.mjs';
import { FLAG } from '../consts/flag.mjs';

describe('CodeSymbol: * ', () => {
  describe('tick(position, cell, codeGrid)', () => {
    it('moves North with Alpha 0b0001', () => {
      const cell = textToCodeSymbol(`*${WHITE}01`);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(1, 0, cell),
      ]);
    });

    it('moves South with Alpha 0b0010', () => {
      const cell = textToCodeSymbol(`*${WHITE}02`);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(1, 2, cell),
      ]);
    });

    it('moves East with Alpha 0b0100', () => {
      const cell = textToCodeSymbol(`*${WHITE}04`);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(2, 1, cell),
      ]);
    });

    it('moves West with Alpha 0b1000', () => {
      const cell = textToCodeSymbol(`*${WHITE}08`);
      const actual = tick(1, 1, cell);

      assert.deepEqual(actual, [
        new GridCell(0, 1, cell),
      ]);
    });
  });

  describe.only('collide', () => {
    it('merges collide2 color into collide1', () => {
      const actual = collide(1, 1, textToCodeSymbol(`${BLACK}02`), [textToCodeSymbol(`${RED}08`)]);
      assert.equal(actual.length, 1, 'Returns merged')
      assert.deepEqual(actual[0], new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.SOUTH));
      // assert.equal(actual.R, 0xFF, 'Red should be 0xFF after merge.');
      // assert.equal(actual.G, 0x00, 'Green should be untouched after merge.');
      // assert.equal(actual.B, 0x00, 'Blue should be untouched after merge.');
      // assert.equal(actual.A, 0x02, 'Alpha should still be collide1.A');
    });

    it('merge works on Blue, Green colors', () => {
      const actual = collide(
        1, 1,
        new CodeSymbol('A', 0x00, 0xFF, 0x00, FLAG.EAST),
        [new CodeSymbol('B', 0x00, 0x00, 0xFF, FLAG.NORTH | FLAG.SET)],
      );
      assert.equal(actual.R, 0x00);
      // assert.equal(actual.G, 0xFF);
      // assert.equal(actual.B, 0xFF);
      // assert.equal(actual.A, FLAG.EAST);
    });
  });
});
