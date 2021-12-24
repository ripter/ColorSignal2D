import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { Change } from '../core/Change.mjs';
import { FLAG, hasFlag } from '../consts/flag.mjs';
import { collide } from './if.mjs';

describe('symbol/if', () => {
  let ifCell;

  describe('without value', () => {
    beforeEach(() => {
      ifCell = new Cell('ʃ');
    });

    it('gains color and direction when signal has SET flag', () => {
      assert.deepEqual(
        collide(ifCell, [new Cell('*', 0x3D, 0x99, 0x70, FLAG.WEST | FLAG.SET)]),
        new Cell('ʃ', 0x3D, 0x99, 0x70, 0x00),
        'Filter picks up color from SET Signal',
      );
    });

    it('does not absorb color when the signal does not have SET', () => {
      assert.deepEqual(
        collide(ifCell, [new Cell('*', 0x3D, 0x99, 0x70, FLAG.WEST)]),
        new Cell('ʃ', 0x00, 0x00, 0x00, 0x00),
        'Filter picks up color from SET Signal',
      );
    });
  });

  describe('with value', () => {
    beforeEach(() => {
      ifCell = new Cell('ʃ', 0x3D, 0x99, 0x70, 0x00);
    });

    it('creates a signal when collided with a signal that passes the mask', () => {

    });
  });
});
