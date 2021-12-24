import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { FLAG, hasFlag } from './flag.mjs';

describe('flag', () => {
  let signal;
  beforeEach(() => {
    signal = new Cell('*', 0xB1, 0x0D, 0xC9, FLAG.NORTH);
  });

  it('returns true when the cell has the Flag set.', () => {
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'Cell has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'Cell does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'Cell does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'Cell does not have WEST');
    assert.isFalse(hasFlag(FLAG.SET, signal), 'Cell does not have SET');
  });

  it('returns true after a flag has been set.', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'Cell has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'Cell does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'Cell does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'Cell does not have WEST');
    assert.isTrue(hasFlag(FLAG.SET, signal), 'Cell has SET');
  });

  it('Can check combined flags', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SOUTH, signal), 'Cell has NORTH, but does not have SOUTH');
    assert.isTrue(hasFlag(FLAG.SOUTH | FLAG.SET, signal), 'Cell does not have SOUTH, but has SET');
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SET, signal), 'Cell has NORTH and SET');
    assert.isFalse(hasFlag(FLAG.SOUTH | FLAG.WEST, signal), 'Cell does not have SOUTH nor WEST');
  });
});
