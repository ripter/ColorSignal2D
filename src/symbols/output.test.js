import { assert } from 'chai';
import sinon from 'sinon';

import { Symbol } from '../core/Symbol.mjs';
import { collide } from './output.mjs';

describe('symbls/output', () => {
  it('pushes each color to OUTPUT', () => {
    const outputSymbol = new Symbol('Ѡ');
    const signalSymbol = new Symbol('*', 0x48, 0x65, 0x6c, 0x02);
    const OUTPUT = sinon.fake();

    const resultSymbol = collide(OUTPUT, outputSymbol, signalSymbol);
    assert.equal(resultSymbol, outputSymbol);
    assert.deepEqual(OUTPUT.args[0][0], ['H', 'e', 'l']);
  });
});
