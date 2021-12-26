import { assert } from 'chai';
import { colorFromSymbol } from './colorFromSymbol.mjs';

describe('colorFromSymbol', () => {
  it('Converts Red', () => {
    assert.equal(
      colorFromSymbol({ R: 0xFF, G: 0x00, B: 0x00 }),
      '#FF0000',
    );
  });
  it('Converts Black', () => {
    assert.equal(
      colorFromSymbol({ R: 0x00, G: 0x00, B: 0x00 }),
      '#000000',
    );
  });
});
