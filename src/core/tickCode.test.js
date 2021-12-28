import { assert } from 'chai';

import { Grid } from './Grid.mjs';
import { GridCell } from './GridCell.mjs';
import { CodeSymbol } from './CodeSymbol.mjs';
import { RULES } from '../symbols/index.mjs';
import { tickCode } from './tickCode.mjs';
import { FLAG } from '../consts/flag.mjs';

describe('core/tickCode', () => {
  let grid;

  beforeEach(() => {
    grid = new Grid(3, 3);
  });

  it('symbols without a tick function are not removed', () => {
    const cell = new CodeSymbol('Ѡ', 0x00, 0x00, 0xFF, 0x04);
    grid.add(1, 1, cell);

    const actual = tickCode(RULES, grid);
    assert.isTrue(actual.has(1, 1), 'There should be a CodeSymbol at position');
    assert.deepEqual(
      Array.from(actual.at(1, 1)),
      [cell]
    );
  });

  it('allows a symbol to change position', () => {
    const cell = new CodeSymbol('*', 0x00, 0xFF, 0x00, 0x04);
    grid.add(1, 1, cell);
    assert.deepEqual(Array.from(grid.at(1, 1)), [cell], 'CodeSymbol starts in the center fo a 3x3 code grid.');


    // Tick runs the rules for every symbol on the code grid, creating a new code grid.
    const actual = tickCode(RULES, grid);
    assert.isTrue(actual.has(2, 1), 'There should be a CodeSymbol at position {x:2, y: 1}');
    assert.deepEqual(
      Array.from(actual.at(2, 1)),
      [cell],
      'CodeSymbol should be the same refrence, but in a new position.'
    );
  });

  describe('collision', () => {
    it('triggers collision rule', () => {
      const eastSignal = new CodeSymbol('*', 0x00, 0x00, 0xFF, FLAG.EAST);
      const westSignal = new CodeSymbol('*', 0x00, 0xFF, 0x00, FLAG.WEST);
      grid.add(0, 1, eastSignal);
      grid.add(2, 1, westSignal);

      assert.deepEqual(
        tickCode(RULES, grid).toJSON(),
        [
          [null, null, null],
          [null, '*#00FFFF08', null],
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
      grid.add(1, 0, downCodeSymbol);
      grid.add(1, 1, westCodeSymbol);

      const actual = tickCode(RULES, grid);
      assert.isTrue(actual.has(0, 1), 'West should have a Signal');
      assert.isTrue(actual.has(1, 1), 'South should have a Signal');
      assert.deepEqual(
        Array.from(actual.at(0, 1)),
        [westCodeSymbol],
      );
      assert.deepEqual(
        Array.from(actual.at(1, 1)),
        [downCodeSymbol],
      );
    });
  });

  describe('grid limits', () => {
    it('left bounds', () => {
      const cell = new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.WEST);
      grid.add(1, 1, cell);
      const actual = tickCode(RULES, grid);

      assert.deepEqual(
        actual.to2DArray(),
        ['delphi'],
        'West Moving CodeSymbol dies when it moves off the grid.'
      );
    });

    it('right bounds', () => {
      const cell = new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.EAST);
      grid.add(1, 1, cell);
      const actual = tickCode(RULES, grid);

      assert.deepEqual(
        actual.to2DArray(),
        [],
        'EAST Moving CodeSymbol dies when it moves off the grid.'
      );
    });

    it('top bounds', () => {
      const cell = new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.NORTH);
      grid.add(1, 0, cell);
      const actual = tickCode(RULES, grid);

      assert.deepEqual(
        actual.to2DArray(),
        [],
        'NORTH Moving CodeSymbol dies when it moves off the grid.'
      );
    });

    it('bottom bounds', () => {
      const cell = new CodeSymbol('*', 0xFF, 0x00, 0x00, FLAG.SOUTH);
      grid.add(1, 2, cell);
      const actual = tickCode(RULES, grid);

      assert.deepEqual(
        actual.to2DArray(),
        [],
        'SOUTH Moving CodeSymbol dies when it moves off the grid.'
      );
    });
  });
});
