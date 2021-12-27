import { assert } from 'chai';

import { CodeSymbol } from './CodeSymbol.mjs';
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

  it('symbols without a tick function are not removed', () => {
    const cell = new CodeSymbol('Ѡ', 0x00, 0x00, 0xFF, 0x04);
    assert.deepEqual(
      tickCode(RULES, [
        [null, null, null],
        [null, cell, null],
        [null, null, null],
      ]),
      [
        [null, null, null],
        [null, cell, null],
        [null, null, null],
      ],
    );
  });

  it('allows a symbol to change position', () => {
    const cell = new CodeSymbol('*', 0x00, 0xFF, 0x00, 0x04);
    grid[1][1] = cell;
    assert.deepEqual(
      grid,
      [
        [null, null, null],
        [null, cell, null],
        [null, null, null],
      ],
      'CodeSymbol starts in the center fo a 3x3 code grid.',
    );

    // Tick runs the rules for every symbol on the code grid, creating a new code grid.
    assert.deepEqual(
      tickCode(RULES, grid),
      [
        [null, null, null],
        [null, null, cell],
        [null, null, null],
      ],
      'CodeSymbol should be the same refrence, but in a new position.',
    );
  });

  describe('collision', () => {
    it('triggers collision rule', () => {
      grid[1][0] = new CodeSymbol('*', 0x00, 0x00, 0xFF, 0x04);
      grid[1][2] = new CodeSymbol('*', 0x00, 0xFF, 0x00, 0x08);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, new CodeSymbol('*', 0x00, 0xFF, 0xFF, 0x08), null],
          [null, null, null],
        ],
      );
    });

    it('triggers collision on the rule from inital codeGrid', () => {
      assert.deepEqual(
        tickCode(RULES, [
          [null, null, null],
          [null, new CodeSymbol('Ɨ', 0, 0, 0, 0), new CodeSymbol('*', 0x00, 0x74, 0xD9, 0x08)],
          [null, null, null],
        ]),
        [
          [null, null, null],
          [null, new CodeSymbol('Ɨ', 0x00, 0x74, 0xD9, 0x08), null],
          [null, null, null],
        ],
      );
    });

    it('updated cells at the same time, allowing them to pass each other', () => {
      const downCodeSymbol = new CodeSymbol('*', 0x00, 0x00, 0xFF, 0x02);
      const westCodeSymbol = new CodeSymbol('*', 0x00, 0xFF, 0x00, 0x08);

      assert.deepEqual(
        tickCode(RULES, [
          [null, downCodeSymbol, null],
          [null, westCodeSymbol, null],
          [null, null, null],
        ]),
        [
          [null, null, null],
          [westCodeSymbol, downCodeSymbol, null],
          [null, null, null],
        ],
      );
    });
  });

  describe('grid limits', () => {
    it('left bounds', () => {
      // CodeSymbol moving West
      grid[1][0] = new CodeSymbol('*', 0xFF, 0x00, 0x00, 0x08);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        'West Moving CodeSymbol dies when it moves off the grid.',
      );
    });

    it('right bounds', () => {
      // CodeSymbol moving East
      grid[1][2] = new CodeSymbol('*', 0xFF, 0x00, 0x00, 0x04);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      );
    });

    it('top bounds', () => {
      // CodeSymbol moving North
      grid[0][1] = new CodeSymbol('*', 0xFF, 0x00, 0x00, 0x01);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      );
    });

    it('bottom bounds', () => {
      // CodeSymbol moving South
      grid[2][1] = new CodeSymbol('*', 0xFF, 0x00, 0x00, 0x02);
      assert.deepEqual(
        tickCode(RULES, grid),
        [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      );
    });
  });
});
