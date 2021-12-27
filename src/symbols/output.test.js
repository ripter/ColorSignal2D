import { assert } from 'chai';
import sinon from 'sinon';

import { CodeSymbol } from '../core/CodeSymbol.mjs';
import { collide } from './output.mjs';

describe('symbls/output', () => {
  it('pushes each color to OUTPUT', () => {
    const outputCodeSymbol = new CodeSymbol('Ѡ');
    const signalCodeSymbol = new CodeSymbol('*', 0x48, 0x65, 0x6c, 0x02);
    const OUTPUT = sinon.fake();

    const resultCodeSymbol = collide(OUTPUT, outputCodeSymbol, signalCodeSymbol);
    assert.equal(resultCodeSymbol, outputCodeSymbol);
    assert.deepEqual(OUTPUT.args[0][0], ['H', 'e', 'l']);
  });
});
