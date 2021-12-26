import { assert } from 'chai';

import { FLAG } from '../consts/flag.mjs';
import { Symbol } from '../core/Symbol.mjs';
import { tick } from './mirror.mjs';

const {
  EAST, SOUTH, NORTH, WEST,
} = FLAG;

describe('mirror', () => {
  let mirrorSymbol;
  beforeEach(() => {
    mirrorSymbol = new Symbol('|');
  });

  it('NORTH turns into SOUTH', () => {
    const changeset = tick({ x: 1, y: 1 }, new Symbol('|', 0xFF, 0x85, 0x1B, NORTH));

    assert.equal(changeset.length, 2, 'Two changes, the Mirror Symbol and the reflected Symbol');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, mirrorSymbol, 'Mirror is reset after tick.');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 2);
    assert.deepEqual(changeset[1].cell, new Symbol('*', 0xFF, 0x85, 0x1B, SOUTH));
  });

  it('SOUTH turns into NORTH', () => {
    const changeset = tick({ x: 1, y: 1 }, new Symbol('|', 0xFF, 0x85, 0x1B, SOUTH));

    assert.equal(changeset.length, 2, 'Two changes, the Mirror Symbol and the reflected Symbol');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, mirrorSymbol, 'Mirror is reset after tick.');

    assert.equal(changeset[1].x, 1);
    assert.equal(changeset[1].y, 0);
    assert.deepEqual(changeset[1].cell, new Symbol('*', 0xFF, 0x85, 0x1B, NORTH));
  });

  it('WEST turns into EAST', () => {
    const changeset = tick({ x: 1, y: 1 }, new Symbol('|', 0xFF, 0x85, 0x1B, WEST));

    assert.equal(changeset.length, 2, 'Two changes, the Mirror Symbol and the reflected Symbol');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, mirrorSymbol, 'Mirror is reset after tick.');

    assert.equal(changeset[1].x, 2);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new Symbol('*', 0xFF, 0x85, 0x1B, EAST));
  });

  it('EAST turns into WEST', () => {
    const changeset = tick({ x: 1, y: 1 }, new Symbol('|', 0xFF, 0x85, 0x1B, EAST));

    assert.equal(changeset.length, 2, 'Two changes, the Mirror Symbol and the reflected Symbol');
    assert.equal(changeset[0].x, 1);
    assert.equal(changeset[0].y, 1);
    assert.deepEqual(changeset[0].cell, mirrorSymbol, 'Mirror is reset after tick.');

    assert.equal(changeset[1].x, 0);
    assert.equal(changeset[1].y, 1);
    assert.deepEqual(changeset[1].cell, new Symbol('*', 0xFF, 0x85, 0x1B, WEST));
  });
});
