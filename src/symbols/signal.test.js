import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { collide, tick } from './signal.mjs';
import { textToCell } from '../utils/textToCell.mjs';
import { BLACK, RED, WHITE } from '../consts/colors.mjs';

describe('Symbol: * ', () => {
  // should(); // Give everything .should
  let codeGrid;
  beforeEach(() => {
    codeGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  });

  describe('tick(position, cell, codeGrid)', () => {
    it('moves North with Alpha 0b0001', () => {
      const cell = textToCell(`*${WHITE}01`);
      const actual = tick({ x: 1, y: 1 }, cell, codeGrid);

      assert.deepEqual(actual, [
        { x: 1, y: 1, cell: null },
        { x: 1, y: 0, cell },
      ]);
    });

    it('moves South with Alpha 0b0010', () => {
      const cell = textToCell(`*${WHITE}02`);
      const actual = tick({ x: 1, y: 1 }, cell, codeGrid);

      assert.deepEqual(actual, [
        { x: 1, y: 1, cell: null },
        { x: 1, y: 2, cell },
      ]);
    });

    it('moves East with Alpha 0b0100', () => {
      const cell = textToCell(`*${WHITE}04`);
      const actual = tick({ x: 1, y: 1 }, cell, codeGrid);

      assert.deepEqual(actual, [
        { x: 1, y: 1, cell: null },
        { x: 2, y: 1, cell },
      ]);
    });

    it('moves West with Alpha 0b1000', () => {
      const cell = textToCell(`*${WHITE}08`);
      const actual = tick({ x: 1, y: 1 }, cell, codeGrid);

      assert.deepEqual(actual, [
        { x: 1, y: 1, cell: null },
        { x: 0, y: 1, cell },
      ]);
    });
  });

  describe('collide(position, collide1, collide2)', () => {
    it('merges collide2 color with collide1', () => {
      const actual = collide(textToCell(`${BLACK}02`), textToCell(`${RED}08`));
      assert.equal(actual.R, 0xFF, 'Red should be 0xFF after merge.');
      assert.equal(actual.G, 0x00, 'Green should be untouched after merge.');
      assert.equal(actual.B, 0x00, 'Blue should be untouched after merge.');
      assert.equal(actual.A, 0x02, 'Alpha should still be collide1.A');
    });

    it('merge works on Blue, Green colors', () => {
      const actual = collide(
        new Cell('A', 0x00, 0xFF, 0x00, 0x04),
        new Cell('B', 0x00, 0x00, 0xFF, 0x18),
      );
      assert.equal(actual.R, 0x00);
      assert.equal(actual.G, 0xFF);
      assert.equal(actual.B, 0xFF);
      assert.equal(actual.A, 0x04);
    });
  });
});
