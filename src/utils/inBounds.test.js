import { assert } from 'chai';
import { inBounds } from './inBounds.mjs';

describe('inBounds', () => {
  it('returns true when x is inside the box', () => {
    assert.isTrue(
      inBounds([0, 0, 3, 3], [0, 2]),
      'Point is just inside the x min and y max'
    )
  });

  it('return false when x < bounds', () => {
    assert.isFalse(
      inBounds([0,0, 3, 3], [1, 3]),
      '-1 is outside the bounds of 0'
    );
  });

  it('return false when x > bounds', () => {
    assert.isFalse(
      inBounds([0,0, 3, 3], [1, 3]),
      '3 is outside or equal to the bounds of 3'
    );
  });

  it('return false when y < bounds', () => {
    assert.isFalse(
      inBounds([0,0, 3, 3], [1, 3]),
      '-1 is outside the bounds of 0'
    );
  });

  it('return false when y > bounds', () => {
    assert.isFalse(
      inBounds([0,0, 3, 3], [1, 3]),
      '3 is outside or equal to the bounds of 3'
    );
  });
});
