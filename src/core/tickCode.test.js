import { assert } from 'chai';
import sinon from 'sinon';

import { Cell } from '../core/Cell.mjs';
import { RULES } from '../symbols/index.mjs';
import { tickCode } from './tickCode.mjs';

describe('core/tickCode', () => {
  let grid;

  beforeEach(() => {
    grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  });

  it('returns a new grid', () => {
    grid[0][0] = new Cell('*', 0x00, 0x00, 0xFF, 0x04);
    const actual = tickCode(RULES, grid);
    assert.exists(actual);
    assert.equal(actual[0][0], null, 'Old position has been cleared.');
    assert.include(actual[0][1], { symbol: '*' }, 'New position has the Cell data.');
  });

  describe('collision', () => {
    it('triggers collision rule', () => {
      grid[1][0] = new Cell('*', 0x00, 0x00, 0xFF, 0x04);
      grid[1][2] = new Cell('*', 0x00, 0xFF, 0x00, 0x08);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, new Cell('*', 0x00, 0xFF, 0xFF, 0x04), null],
          [null, null, null],
        ]
      )
    });
  });

  describe('grid limits', () => {
    it('left bounds', () => {
      // Signal moving West
      grid[1][0] = new Cell('*', 0xFF, 0x00, 0x00, 0x08);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        'West Moving Signal dies when it moves off the grid.'
      );
    });

    it('right bounds', () => {
      // Signal moving East
      grid[1][2] = new Cell('*', 0xFF, 0x00, 0x00, 0x04);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]
      );
    });

    it('top bounds', () => {
      // Signal moving North
      grid[0][1] = new Cell('*', 0xFF, 0x00, 0x00, 0x01);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]
      );
    });

    it('bottom bounds', () => {
      // Signal moving South
      grid[2][1] = new Cell('*', 0xFF, 0x00, 0x00, 0x02);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]
      );
    });
  });
});
