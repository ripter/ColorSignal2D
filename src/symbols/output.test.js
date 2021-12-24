import { assert } from 'chai';
import sinon from 'sinon';

import { Signal } from '../core/Signal.mjs';
import { collide } from './output.mjs';

describe('symbls/output', () => {
  it('pushes each color to OUTPUT', () => {
    const outputSignal = new Signal('Ѡ');
    const signalSignal = new Signal('*', 0x48, 0x65, 0x6c, 0x02);
    const OUTPUT = sinon.fake();

    const resultSignal = collide(OUTPUT, outputSignal, signalSignal);
    assert.equal(resultSignal, outputSignal);
    assert.deepEqual(OUTPUT.args[0][0], ['H', 'e', 'l']);
  });
});
