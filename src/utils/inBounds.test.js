import { assert } from 'chai';
import { inBounds } from './inBounds.mjs';

describe('inBounds', () => {
  it('returns true when x is inside the box', () => {
    assert.isTrue(
      inBounds([1, 1], [0, 0, 3, 3]),
      'Point is inside the box'
    )
  });

  it('return false when x < bounds', () => {
    assert.isFalse(
      inBounds([-1, 1], [0,0, 3, 3]),
      '-1 is outside the bounds of 0'
    );
  });

  it('return false when x > bounds', () => {
    assert.isFalse(
      inBounds([3, 1], [0,0, 3, 3]),
      '3 is outside or equal to the bounds of 3'
    );
  });

  it('return false when y < bounds', () => {
    assert.isFalse(
      inBounds([1, -1], [0,0, 3, 3]),
      '-1 is outside the bounds of 0'
    );
  });

  it('return false when y > bounds', () => {
    assert.isFalse(
      inBounds([1, 3], [0,0, 3, 3]),
      '3 is outside or equal to the bounds of 3'
    );
  });
});
