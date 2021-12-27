import { assert } from 'chai';

import { CodeSymbol } from './CodeSymbol.mjs';

describe('core/CodeSymbol', () => {
  let symbol;
  beforeEach(() => {
    symbol = new CodeSymbol('*', 0xFF, 0x85, 0x1B, 0x04);
  });

  it('.toString()', () => {
    assert.equal(
      symbol.toString(),
      '*#FF851B04',
    );
  });
});
