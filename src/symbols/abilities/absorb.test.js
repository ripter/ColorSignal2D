import { assert } from 'chai';

import { absorb } from './absorb.mjs';
import { Cell } from '../../core/Cell.mjs';

describe('symbol/abilities/absorb', () => {
  it('merges the color value into self', () => {
    assert.deepEqual(
      absorb(new Cell('-', 0x00, 0x00, 0x00, 0x00), [
        new Cell('*', 0x2E, 0xCC, 0x40, 0x02)
      ]),
      new Cell('-', 0x2E, 0xCC, 0x40, 0x02)
    )
  });

  it('merges all the color values into self', () => {
    assert.deepEqual(
      absorb(new Cell('-', 0x00, 0x00, 0x00, 0x00), [
        new Cell('*', 0x0E, 0xCC, 0x00, 0x02),
        new Cell('*', 0x20, 0x00, 0x40, 0x04),
      ]),
      new Cell('-', 0x2E, 0xCC, 0x40, 0x02),
      'Colors RGB add, Alpha is set by the first cell'
    );
  });
});
