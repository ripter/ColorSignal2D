import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { FLAG, hasFlag } from './flag.mjs';

describe('flag', () => {
  let signal;
  beforeEach(() => {
    signal = new CodeSymbol('*', 0xB1, 0x0D, 0xC9, FLAG.NORTH);
  });

  it('returns true when the cell has the Flag set.', () => {
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'CodeSymbol has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'CodeSymbol does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'CodeSymbol does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'CodeSymbol does not have WEST');
    assert.isFalse(hasFlag(FLAG.SET, signal), 'CodeSymbol does not have SET');
  });

  it('returns true after a flag has been set.', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH, signal), 'CodeSymbol has NORTH');
    assert.isFalse(hasFlag(FLAG.SOUTH, signal), 'CodeSymbol does not have SOUTH');
    assert.isFalse(hasFlag(FLAG.EAST, signal), 'CodeSymbol does not have EAST');
    assert.isFalse(hasFlag(FLAG.WEST, signal), 'CodeSymbol does not have WEST');
    assert.isTrue(hasFlag(FLAG.SET, signal), 'CodeSymbol has SET');
  });

  it('Can check combined flags', () => {
    signal.A |= FLAG.SET;
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SOUTH, signal), 'CodeSymbol has NORTH, but does not have SOUTH');
    assert.isTrue(hasFlag(FLAG.SOUTH | FLAG.SET, signal), 'CodeSymbol does not have SOUTH, but has SET');
    assert.isTrue(hasFlag(FLAG.NORTH | FLAG.SET, signal), 'CodeSymbol has NORTH and SET');
    assert.isFalse(hasFlag(FLAG.SOUTH | FLAG.WEST, signal), 'CodeSymbol does not have SOUTH nor WEST');
  });
});
