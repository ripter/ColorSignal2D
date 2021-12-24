import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { FLAG, hasFlag } from './flag.mjs';

describe('flag', () => {
  let signal;
  beforeEach(() => {
    signal = new Cell('*', 0xB1, 0x0D, 0xC9, FLAG.NORTH);
  });

  it('returns true when the cell has the Flag set.', () => {
    assert.isTrue(hasFlag(signal, FLAG.NORTH), 'Cell has NORTH');
    assert.isFalse(hasFlag(signal, FLAG.SOUTH), 'Cell does not have SOUTH');
    assert.isFalse(hasFlag(signal, FLAG.EAST), 'Cell does not have EAST');
    assert.isFalse(hasFlag(signal, FLAG.WEST), 'Cell does not have WEST');
    assert.isFalse(hasFlag(signal, FLAG.SET), 'Cell does not have SET');
  });

  it('returns true after a flag has been set.', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(signal, FLAG.NORTH), 'Cell has NORTH');
    assert.isFalse(hasFlag(signal, FLAG.SOUTH), 'Cell does not have SOUTH');
    assert.isFalse(hasFlag(signal, FLAG.EAST), 'Cell does not have EAST');
    assert.isFalse(hasFlag(signal, FLAG.WEST), 'Cell does not have WEST');
    assert.isTrue(hasFlag(signal, FLAG.SET), 'Cell has SET');
  });

  it('Can check combined flags', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(signal, FLAG.NORTH | FLAG.SOUTH), 'Cell has NORTH, but does not have SOUTH');
    assert.isTrue(hasFlag(signal, FLAG.SOUTH | FLAG.SET), 'Cell does not have SOUTH, but has SET');
    assert.isTrue(hasFlag(signal, FLAG.NORTH | FLAG.SET), 'Cell has NORTH and SET');
    assert.isFalse(hasFlag(signal, FLAG.SOUTH | FLAG.WEST), 'Cell does not have SOUTH nor WEST');
  });
});
