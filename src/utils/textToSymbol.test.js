import { assert } from 'chai';
import { textToSymbol } from './textToSymbol.mjs';

describe('textToSymbol', () => {
  it('converts "*" to cell with default color & config', () => {
    const actual = textToSymbol('*');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0x00, 'Sets Red');
    assert.equal(actual.G, 0x00, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x00, 'Sets Alpha');
  });
  it('converts "*#FF0000" to cell with default config', () => {
    const actual = textToSymbol('*#FF0000');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0xFF, 'Sets Red');
    assert.equal(actual.G, 0x00, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x00, 'Sets Alpha');
  });
  it('converts "*#00FF0004" to cell', () => {
    const actual = textToSymbol('*#00FF0004');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0x00, 'Sets Red');
    assert.equal(actual.G, 0xFF, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x04, 'Sets Alpha');
  });
});
