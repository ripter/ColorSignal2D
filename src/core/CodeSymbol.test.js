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

  it('props RGBA for colors values.', () => {
    assert.equal(symbol.R, 0xFF);
    assert.equal(symbol.G, 0x85);
    assert.equal(symbol.B, 0x1B);
    assert.equal(symbol.A, 0x04);
  });
});
