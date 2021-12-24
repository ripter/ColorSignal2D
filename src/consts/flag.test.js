import { assert } from 'chai';

import { Signal } from '../core/Signal.mjs';
import { FLAG, hasFlag } from './flag.mjs';

describe('flag', () => {
  let signal;
  beforeEach(() => {
    signal = new Signal('*', 0xB1, 0x0D, 0xC9, FLAG.NORTH);
  });

  it('returns true when the cell has the Flag set.', () => {
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'Signal has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'Signal does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'Signal does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'Signal does not have WEST');
    assert.isFalse(hasFlag(FLAG.SET, signal), 'Signal does not have SET');
  });

  it('returns true after a flag has been set.', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'Signal has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'Signal does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'Signal does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'Signal does not have WEST');
    assert.isTrue(hasFlag(FLAG.SET, signal), 'Signal has SET');
  });

  it('Can check combined flags', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SOUTH, signal), 'Signal has NORTH, but does not have SOUTH');
    assert.isTrue(hasFlag(FLAG.SOUTH | FLAG.SET, signal), 'Signal does not have SOUTH, but has SET');
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SET, signal), 'Signal has NORTH and SET');
    assert.isFalse(hasFlag(FLAG.SOUTH | FLAG.WEST, signal), 'Signal does not have SOUTH nor WEST');
  });
});
