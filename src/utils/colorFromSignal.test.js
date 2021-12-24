import { assert } from 'chai';
import { colorFromSignal } from './colorFromSignal.mjs';

describe('colorFromSignal', () => {
  it('Converts Red', () => {
    assert.equal(
      colorFromSignal({ R: 0xFF, G: 0x00, B: 0x00 }),
      '#FF0000',
    );
  });
  it('Converts Black', () => {
    assert.equal(
      colorFromSignal({ R: 0x00, G: 0x00, B: 0x00 }),
      '#000000',
    );
  });
});
