import { assert } from 'chai';

import { Cell } from '../core/Cell.mjs';
import { collide } from './output.mjs';

describe('symbls/output', () => {
  it('pushes each color to OUTPUT', () => {
    global.window = {
      OUTPUT: [],
    };
    const outputCell = new Cell('Ѡ');
    const signalCell = new Cell('*', 0x48, 0x65, 0x6c, 0x02);

    const resultCell = collide(outputCell, signalCell);
    assert.equal(resultCell, outputCell);
    assert.deepEqual(
      global.window.OUTPUT,
      ['H', 'e', 'l'],
    );
  });
});
