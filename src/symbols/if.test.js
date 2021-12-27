import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { collide } from './if.mjs';

describe('symbol/if', () => {
  let ifCodeSymbol;

  describe('without value', () => {
    beforeEach(() => {
      ifCodeSymbol = new CodeSymbol('ʃ');
    });

    it('gains color and direction when signal has SET flag', () => {
      assert.deepEqual(
        collide(ifCodeSymbol, [new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST | FLAG.SET)]),
        new CodeSymbol('ʃ', 0x3D, 0x99, 0x70, 0x00),
        'Filter picks up color from SET CodeSymbol',
      );
    });

    it('does not absorb color when the signal does not have SET', () => {
      assert.deepEqual(
        collide(ifCodeSymbol, [new CodeSymbol('*', 0x3D, 0x99, 0x70, FLAG.WEST)]),
        new CodeSymbol('ʃ', 0x00, 0x00, 0x00, 0x00),
        'Filter picks up color from SET CodeSymbol',
      );
    });
  });

  describe('with value', () => {
    beforeEach(() => {
      ifCodeSymbol = new CodeSymbol('ʃ', 0x3D, 0x99, 0x70, 0x00);
    });

    it('creates a signal when collided with a signal that passes the mask', () => {

    });
  });
});
