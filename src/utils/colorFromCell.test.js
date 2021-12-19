import { assert } from 'chai';
import { colorFromCell } from './colorFromCell.mjs';


describe('colorFromCell', () => {
  it('Converts Red', () => {
    assert.equal(
      colorFromCell({R: 0xFF, G: 0x00, B: 0x00}),
      '#FF0000',
    )
  });
});
