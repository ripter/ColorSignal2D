import { assert } from 'chai';
import { textToCodeSymbol } from './textToCodeSymbol.mjs';

describe('textToCodeSymbol', () => {
  it('converts "*" to cell with default color & config', () => {
    const actual = textToCodeSymbol('*');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0x00, 'Sets Red');
    assert.equal(actual.G, 0x00, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x00, 'Sets Alpha');
  });
  it('converts "*#FF0000" to cell with default config', () => {
    const actual = textToCodeSymbol('*#FF0000');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0xFF, 'Sets Red');
    assert.equal(actual.G, 0x00, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x00, 'Sets Alpha');
  });
  it('converts "*#00FF0004" to cell', () => {
    const actual = textToCodeSymbol('*#00FF0004');
    assert.equal(actual.symbol, '*', 'Sets symbol');
    assert.equal(actual.R, 0x00, 'Sets Red');
    assert.equal(actual.G, 0xFF, 'Sets Green');
    assert.equal(actual.B, 0x00, 'Sets Blue');
    assert.equal(actual.A, 0x04, 'Sets Alpha');
  });
});