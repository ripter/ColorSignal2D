import { assert } from 'chai';

import { textToCell } from '../utils/textToCell.mjs';
import { WHITE, asNumber } from '../consts/colors.mjs';
import { tick } from './signal.mjs';


describe('Symbol: * ', () => {
  // should(); // Give everything .should
  let codeGrid;
  beforeEach(() => {
    codeGrid = [
      [null,null,null],
      [null,null,null],
      [null,null,null],
    ];
  });

  describe('tick()', () => {
    it('moves North with Alpha 0b0001', () => {
      const cell = textToCell(`*${WHITE}01`);
      const actual = tick({x: 1, y: 1}, cell, codeGrid);

      assert.deepEqual(actual, [
        {x: 1, y: 1, cell: null},
        {x: 1, y: 0, cell},
      ]);
    });

    it('moves South with Alpha 0b0010', () => {
      const cell = textToCell(`*${WHITE}02`);
      const actual = tick({x: 1, y: 1}, cell, codeGrid);

      assert.deepEqual(actual, [
        {x: 1, y: 1, cell: null},
        {x: 1, y: 2, cell},
      ]);
    });

    it('moves East with Alpha 0b0100', () => {
      const cell = textToCell(`*${WHITE}04`);
      const actual = tick({x: 1, y: 1}, cell, codeGrid);

      assert.deepEqual(actual, [
        {x: 1, y: 1, cell: null},
        {x: 2, y: 1, cell},
      ]);
    });

    it('moves West with Alpha 0b1000', () => {
      const cell = textToCell(`*${WHITE}08`);
      const actual = tick({x: 1, y: 1}, cell, codeGrid);

      assert.deepEqual(actual, [
        {x: 1, y: 1, cell: null},
        {x: 0, y: 1, cell},
      ]);
    });

  });

});
