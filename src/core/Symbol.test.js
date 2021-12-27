import { assert } from 'chai';

import { Symbol } from './Symbol.mjs'

describe('core/Symbol', () => {
  let symbol;
  beforeEach(() => {
    symbol = new Symbol('*', 0xFF, 0x85, 0x1B, 0x04);
  });

  it('.toString()', () => {
    assert.equal(
      symbol.toString(),
      '*#FF851B04'
    );
  });
});
