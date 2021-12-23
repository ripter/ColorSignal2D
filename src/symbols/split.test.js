import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { tick } from './split.mjs';
import {
  NORTH, SOUTH, EAST, WEST,
} from './signal.mjs';

describe('symbol/split', () => {
  let splitCell;

  beforeEach(() => {
    splitCell = new Cell('Ɨ', 0x00, 0x00, 0x00, 0x00);
  });

  it('SOUTH splits to the WEST', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new Cell('Ɨ', 0xFF, 0x85, 0x1B, SOUTH),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split Symbol and two Signals');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCell, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 2);
    assert.deepEqual(changeset[1].cell, new Cell('*', 0xFF, 0x85, 0x1B, SOUTH));

    assert.equal(changeset[2].x, 0);
    assert.equal(changeset[2].y, 1);
    assert.deepEqual(changeset[2].cell, new Cell('*', 0xFF, 0x85, 0x1B, WEST));
  });

  it('NORTH splits to the EAST', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new Cell('Ɨ', 0xFF, 0x85, 0x1B, NORTH),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split Symbol and two Signals');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCell, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 0);
    assert.deepEqual(changeset[1].cell, new Cell('*', 0xFF, 0x85, 0x1B, NORTH));

    assert.equal(changeset[2].x, 2);
    assert.equal(changeset[2].y, 1);
    assert.deepEqual(changeset[2].cell, new Cell('*', 0xFF, 0x85, 0x1B, EAST));
  });

  it('WEST splits to the NORTH', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new Cell('Ɨ', 0xFF, 0x85, 0x1B, WEST),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split Symbol and two Signals');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCell, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 0);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new Cell('*', 0xFF, 0x85, 0x1B, WEST));

    assert.equal(changeset[2].x, 1);
    assert.equal(changeset[2].y, 0);
    assert.deepEqual(changeset[2].cell, new Cell('*', 0xFF, 0x85, 0x1B, NORTH));
  });

  it('EAST splits to the SOUTH', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new Cell('Ɨ', 0xFF, 0x85, 0x1B, EAST),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split Symbol and two Signals');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCell, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 2);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new Cell('*', 0xFF, 0x85, 0x1B, EAST));

    assert.equal(changeset[2].x, 1);
    assert.equal(changeset[2].y, 2);
    assert.deepEqual(changeset[2].cell, new Cell('*', 0xFF, 0x85, 0x1B, SOUTH));
  });
});
