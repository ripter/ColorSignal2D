import { assert } from 'chai';

import { Symbol } from '../core/Symbol.mjs';
import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { collide } from './if.mjs';

describe('symbol/if', () => {
  let ifSymbol;

  describe('without value', () => {
    beforeEach(() => {
      ifSymbol = new Symbol('ʃ');
    });

    it('gains color and direction when signal has SET flag', () => {
      assert.deepEqual(
        collide(ifSymbol, [new Symbol('*', 0x3D, 0x99, 0x70, FLAG.WEST | FLAG.SET)]),
        new Symbol('ʃ', 0x3D, 0x99, 0x70, 0x00),
        'Filter picks up color from SET Symbol',
      );
    });

    it('does not absorb color when the signal does not have SET', () => {
      assert.deepEqual(
        collide(ifSymbol, [new Symbol('*', 0x3D, 0x99, 0x70, FLAG.WEST)]),
        new Symbol('ʃ', 0x00, 0x00, 0x00, 0x00),
        'Filter picks up color from SET Symbol',
      );
    });
  });

  describe('with value', () => {
    beforeEach(() => {
      ifSymbol = new Symbol('ʃ', 0x3D, 0x99, 0x70, 0x00);
    });

    it('creates a signal when collided with a signal that passes the mask', () => {

    });
  });
});
