import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { collide } from './if.mjs';

describe('symbol/if', () => {
  let ifCodeSymbol;

  describe('without value', () => {
    beforeEach(() => {
      ifCodeSymbol = new CodeSymbol('ʃ');
    });

    describe('collide', () => {
      it('gains color and direction when signal has SET flag', () => {
        assert.deepEqual(
          collide(1, 1, ifCodeSymbol, [new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST | FLAG.SET)]),
          [new GridCell(1, 1, new CodeSymbol('ʃ', 0x3D, 0x99, 0x70, 0x00))],
          'Filter picks up color from SET CodeSymbol',
        );
      });

      it('does not absorb color when the signal does not have SET', () => {
        assert.deepEqual(
          collide(1, 1, ifCodeSymbol, [new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST)]),
          [
            new GridCell(1, 1, new CodeSymbol('ʃ', 0x00, 0x00, 0x00, 0x00)),
          ],
          'Filter picks up color from SET CodeSymbol',
        );
      });
    });
  });

  describe('with value', () => {
    beforeEach(() => {
      ifCodeSymbol = new CodeSymbol('ʃ', 0x3D, 0x99, 0x70, 0x00);
    });

    describe('collide', () => {
      it('Passes signal though when color passes mask.', () => {
        assert.deepEqual(
          collide(1, 1, ifCodeSymbol, [new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST)]),
          [
            new GridCell(1, 1, new CodeSymbol('ʃ', 0x3D, 0x99, 0x70, 0x00)),
            new GridCell(0, 1, new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST)),
          ],
        );
      });
    });
  });
});
