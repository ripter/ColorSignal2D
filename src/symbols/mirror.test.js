import { assert } from 'chai';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { FLAG } from '../consts/flag.mjs';
import { GridCell } from '../core/GridCell.mjs';
import { tick } from './mirror.mjs';

describe('mirror', () => {
  describe('tick', () => {
    it('NORTH turns into SOUTH', () => {
      const changeset = tick(1, 1, new CodeSymbol('|', 0xFF, 0x85, 0x1B, FLAG.NORTH));
      assert.equal(changeset.length, 2, 'Two changes, the Mirror CodeSymbol and the reflected CodeSymbol');

      assert.deepEqual(
        changeset[0],
        new GridCell(1, 1, new CodeSymbol('|', 0x00, 0x00, 0x00, 0x00)),
        'Mirror is reset after tick.',
      );
      assert.deepEqual(
        changeset[1],
        new GridCell(1, 2, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.SOUTH)),
      );
    });

    it('SOUTH turns into NORTH', () => {
      const changeset = tick(1, 1, new CodeSymbol('|', 0xFF, 0x85, 0x1B, FLAG.SOUTH));
      assert.equal(changeset.length, 2, 'Two changes, the Mirror CodeSymbol and the reflected CodeSymbol');

      assert.deepEqual(
        changeset[0],
        new GridCell(1, 1, new CodeSymbol('|', 0x00, 0x00, 0x00, 0x00)),
        'Mirror is reset after tick.',
      );
      assert.deepEqual(
        changeset[1],
        new GridCell(1, 0, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.NORTH)),
      );
    });

    it('WEST turns into EAST', () => {
      const changeset = tick(1, 1, new CodeSymbol('|', 0xFF, 0x85, 0x1B, FLAG.WEST));
      assert.equal(changeset.length, 2, 'Two changes, the Mirror CodeSymbol and the reflected CodeSymbol');

      assert.deepEqual(
        changeset[0],
        new GridCell(1, 1, new CodeSymbol('|', 0x00, 0x00, 0x00, 0x00)),
        'Mirror is reset after tick.',
      );
      assert.deepEqual(
        changeset[1],
        new GridCell(2, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.EAST)),
      );
    });

    it('EAST turns into WEST', () => {
      const changeset = tick(1, 1, new CodeSymbol('|', 0xFF, 0x85, 0x1B, FLAG.EAST));
      assert.equal(changeset.length, 2, 'Two changes, the Mirror CodeSymbol and the reflected CodeSymbol');

      assert.deepEqual(
        changeset[0],
        new GridCell(1, 1, new CodeSymbol('|', 0x00, 0x00, 0x00, 0x00)),
        'Mirror is reset after tick.',
      );
      assert.deepEqual(
        changeset[1],
        new GridCell(0, 1, new CodeSymbol('*', 0xFF, 0x85, 0x1B, FLAG.WEST)),
      );
    });
  });
});
