import { assert } from 'chai';

import { Grid } from './Grid.mjs';
import { CodeSymbol } from './CodeSymbol.mjs';

describe('Grid', () => {
  let grid;
  beforeEach(() => {
    grid = new Grid(3, 3);
  });

  it('has .width, .height', () => {
    assert.equal(grid.width, 3);
    assert.equal(grid.height, 3);
  });

  it('.at() returns null if no items exist', () => {
    assert.isNull(grid.at(1, 1));
  });

  it('.has() returns false if there are no items at position', () => {
    assert.isFalse(grid.has(1, 1));
  });
  it('.has() returns true if there is an item at position', () => {
    grid.add(1, 1, { name: 'Delphi' });
    assert.isTrue(grid.has(1, 1));
  });

  it('.add() can set and .at() can get a single item', () => {
    grid.add(1, 1, { name: 'Delphi' });
    assert.deepEqual(
      grid.at(1, 1).size,
      1,
      'A single item at the grid position',
    );
    assert.deepEqual(
      Array.from(grid.at(1, 1)),
      [{ name: 'Delphi' }],
    );
  });
  it('.add() can add many items and .at() returns the set of values', () => {
    grid.add(1, 1, { name: 'Delphi' });
    grid.add(1, 1, { name: 'Chris' });
    grid.add(1, 1, { name: 'Xiaoyan' });
    assert.deepEqual(
      grid.at(1, 1).size,
      3,
      'Three items at the grid position',
    );
    assert.deepEqual(
      Array.from(grid.at(1, 1)),
      [{ name: 'Delphi' }, { name: 'Chris' }, { name: 'Xiaoyan' }],
    );
  });

  it('.toString()', () => {
    grid.add(0, 1, new CodeSymbol('*', 0x00, 0x74, 0xD9, 0x01));
    grid.add(1, 1, new CodeSymbol('D', 0x7F, 0xDB, 0xFF, 0x02));
    grid.add(1, 1, new CodeSymbol('C', 0xFF, 0x85, 0x1B, 0x04));
    grid.add(1, 1, new CodeSymbol('X', 0x2E, 0xCC, 0x40, 0x08));
    assert.equal(grid.toString(), '[[null,null,null],[["*#0074D901"],["D#7FDBFF02","C#FF851B04","X#2ECC4008"],null],[null,null,null]]');
  });

  it('.to2DArray() with data', () => {
    grid.add(1, 0, { name: 'Rose' });
    grid.add(1, 1, { name: 'Delphi' });
    grid.add(1, 1, { name: 'Chris' });
    grid.add(1, 1, { name: 'Xiaoyan' });
    assert.deepEqual(grid.to2DArray(), [
      [null, [{ name: 'Rose' }], null],
      [null, [{ name: 'Delphi' }, { name: 'Chris' }, { name: 'Xiaoyan' }], null],
      [null, null, null],
    ]);
  });
  it('.to2DArray() without data', () => {
    assert.deepEqual(grid.to2DArray(), [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });
  it('.to2DArray(shouldStringifyValue = true) with data', () => {
    grid.add(1, 0, new CodeSymbol('*', 0x00, 0x74, 0xD9, 0x01));
    grid.add(1, 1, new CodeSymbol('D', 0x7F, 0xDB, 0xFF, 0x02));
    grid.add(1, 1, new CodeSymbol('C', 0xFF, 0x85, 0x1B, 0x04));
    grid.add(1, 1, new CodeSymbol('X', 0x2E, 0xCC, 0x40, 0x08));
    assert.deepEqual(
      grid.toJSON(),
      [
        [null, '*#0074D901', null],
        [null, ['D#7FDBFF02', 'C#FF851B04', 'X#2ECC4008'], null],
        [null, null, null],
      ],
    );
  });

  it('.collisions returns an [GridCell, ]', () => {
    grid.add(1, 0, { name: 'Rose' });
    grid.add(1, 1, { name: 'Delphi' });
    grid.add(1, 1, { name: 'Chris' });
    grid.add(1, 1, { name: 'Xiaoyan' });
    assert.deepEqual(
      grid.collisions,
      [
        {
          x: 1,
          y: 1,
          value: [
            { name: 'Delphi' }, { name: 'Chris' }, { name: 'Xiaoyan' },
          ],
        },
      ],
    );
  });
  it('.collisions returns empty when there are no collsions.', () => {
    assert.deepEqual(
      grid.collisions,
      [],
    );
  });
  it('.hasCollisions returns true when any item.size > 1', () => {

  });
  it('.hasCollisions returns false when all item.size === 1', () => {

  });
  it('.hasCollisions returns false when grid is empty', () => {
    assert.isFalse(grid.hasCollisions, 'No collisions on an empty grid');
  });
});
