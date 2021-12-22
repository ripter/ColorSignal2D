import { assert } from 'chai';
import sinon from 'sinon';

import { Cell } from '../core/Cell.mjs';
import { collide } from './output.mjs';

describe('symbls/output', () => {
  it('pushes each color to OUTPUT', () => {
    const outputCell = new Cell('Ѡ');
    const signalCell = new Cell('*', 0x48, 0x65, 0x6c, 0x02);
    const OUTPUT = sinon.fake();

    const resultCell = collide(OUTPUT, outputCell, signalCell);
    assert.equal(resultCell, outputCell);
    assert.deepEqual(OUTPUT.args[0][0], ['H', 'e', 'l']);
  });
});
