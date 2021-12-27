import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { FLAG } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { tick } from './split.mjs';


describe('symbol/split', () => {
  let splitCodeSymbol;

  beforeEach(() => {
    splitCodeSymbol = new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00);
  });

  it('SOUTH splits to the WEST', () => {
    const changeset = tick(1, 1, new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, FLAG.SOUTH));
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');

    assert.deepEqual(
      changeset[0],
      new GridCell(1, 1, new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00)),
      'Color is reset to black after creating signals'
    );
    assert.deepEqual(
      changeset[1],
      new GridCell(1, 2, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.SOUTH)),
    );
    assert.deepEqual(
      changeset[2],
      new GridCell(0, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.WEST)),
    );
  });

  it('NORTH splits to the EAST', () => {
    const changeset = tick(1, 1, new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, FLAG.NORTH));
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');

    assert.deepEqual(
      changeset[0],
      new GridCell(1, 1, new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00)),
      'Color is reset to black after creating signals'
    );
    assert.deepEqual(
      changeset[1],
      new GridCell(1, 0, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.NORTH)),
    );
    assert.deepEqual(
      changeset[2],
      new GridCell(2, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.EAST)),
    );
  });

  it('WEST splits to the NORTH', () => {
    const changeset = tick(1, 1, new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, FLAG.WEST));
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');

    assert.deepEqual(
      changeset[0],
      new GridCell(1, 1, new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00)),
      'Color is reset to black after creating signals'
    );
    assert.deepEqual(
      changeset[1],
      new GridCell(0, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.WEST)),
    );
    assert.deepEqual(
      changeset[2],
      new GridCell(1, 0, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.NORTH)),
    );
  });

  it('EAST splits to the SOUTH', () => {
    const changeset = tick(1, 1, new CodeSymbol('Ɨ', 0xFF, 0x85, 0x1B, FLAG.EAST));
    assert.equal(changeset.length, 3, 'Three changes, the Split CodeSymbol and two CodeSymbols');

    assert.deepEqual(
      changeset[0],
      new GridCell(1, 1, new CodeSymbol('Ɨ', 0x00, 0x00, 0x00, 0x00)),
      'Color is reset to black after creating signals'
    );
    assert.deepEqual(
      changeset[1],
      new GridCell(2, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.EAST)),
    );
    assert.deepEqual(
      changeset[2],
      new GridCell(1, 2, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.SOUTH)),
    );
  });
});
