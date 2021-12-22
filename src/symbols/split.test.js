import { assert } from 'chai';

import { collide } from './split.mjs';
import { Cell } from '../core/Cell.mjs';
import { Change } from '../core/Change.mjs';



describe('symbol/split', () => {
  let splitCell, splitChange, eastSignal, southSignal;
  beforeEach(() => {
    splitCell = new Cell('Ɨ', 0x00, 0x00, 0x00, 0x00);
    splitChange = new Change(1, 1, splitCell);
    eastSignal = new Cell('*', 0xFF, 0x85, 0x1B, 0x04);
    southSignal = new Cell('*', 0xFF, 0xDC, 0x00, 0x02);
  });


  it('stores the signal value on collide', () => {
    const actual = collide(splitCell, eastSignal);
    assert.equal(actual.symbol, 'Ɨ');
    assert.deepEqual(actual.R, 0xFF, 'Red');
    assert.deepEqual(actual.G, 0x85, 'Green');
    assert.deepEqual(actual.B, 0x1B, 'Blue');
    assert.deepEqual(actual.A, 0x04, 'Alpha');
  });
});
