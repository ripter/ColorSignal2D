import { assert } from 'chai';

import { FLAG } from '../consts/flag.mjs';
import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { tick } from './split.mjs';

const {
  NORTH, SOUTH, EAST, WEST,
} = FLAG;

describe('symbol/split', () => {
  let splitCodeSymbol;

  beforeEach(() => {
    splitCodeSymbol = new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00);
  });

  it('SOUTH splits to the WEST', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, SOUTH),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCodeSymbol, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 2);
    assert.deepEqual(changeset[1].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, SOUTH));

    assert.equal(changeset[2].x, 0);
    assert.equal(changeset[2].y, 1);
    assert.deepEqual(changeset[2].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, WEST));
  });

  it('NORTH splits to the EAST', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, NORTH),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCodeSymbol, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 0);
    assert.deepEqual(changeset[1].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, NORTH));

    assert.equal(changeset[2].x, 2);
    assert.equal(changeset[2].y, 1);
    assert.deepEqual(changeset[2].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, EAST));
  });

  it('WEST splits to the NORTH', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, WEST),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCodeSymbol, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 0);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, WEST));

    assert.equal(changeset[2].x, 1);
    assert.equal(changeset[2].y, 0);
    assert.deepEqual(changeset[2].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, NORTH));
  });

  it('EAST splits to the SOUTH', () => {
    const changeset = tick(
      { x: 1, y: 1 },
      new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, EAST),
    );
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, splitCodeSymbol, 'Color is reset to black after creating signals');

    assert.equal(changeset[1].x, 2);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, EAST));

    assert.equal(changeset[2].x, 1);
    assert.equal(changeset[2].y, 2);
    assert.deepEqual(changeset[2].cell, new CodeSymbol('*', 0xFF, 0x85, 0x1B, SOUTH));
  });
});
