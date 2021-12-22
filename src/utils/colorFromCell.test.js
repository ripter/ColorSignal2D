import { assert } from 'chai';
import { colorFromCell } from './colorFromCell.mjs';

describe('colorFromCell', () => {
  it('Converts Red', () => {
    assert.equal(
      colorFromCell({ R: 0xFF, G: 0x00, B: 0x00 }),
      '#FF0000',
    );
  });
  it('Converts Black', () => {
    assert.equal(
      colorFromCell({ R: 0x00, G: 0x00, B: 0x00 }),
      '#000000',
    );
  });
});
