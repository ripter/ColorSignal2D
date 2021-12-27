import { assert } from 'chai';
import { colorFromColor } from './colorFromColor.mjs';

describe('colorFromColor', () => {
  it('Converts Red', () => {
    assert.equal(
      colorFromColor({ R: 0xFF, G: 0x00, B: 0x00 }),
      '#FF0000',
    );
  });
  it('Converts Black', () => {
    assert.equal(
      colorFromColor({ R: 0x00, G: 0x00, B: 0x00 }),
      '#000000',
    );
  });
  it('Converts with Alpha', () => {
    assert.equal(
      colorFromColor({
        R: 0xFF, G: 0x85, B: 0x1B, A: 0x04,
      }, true),
      '#FF851B04',
    );
  });
});
