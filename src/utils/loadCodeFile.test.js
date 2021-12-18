import { assert } from 'chai';
import { loadCodeFile } from './loadCodeFile.mjs';

describe('utils/loadCodeFile', () => {
  it('loads entire grid', () => {
    const actual = loadCodeFile([
      [null, '*#FF551104', null],
    ]);
    assert.exists(actual[0][1]);
    assert.include(actual[0[1]], {symbol: '*', R: 0xFF, G: 0x55, B: 0x11, A: 0x04});
    // assert.include(actual, [
    //   [null, {symbol: '*', R: 0xFF, G: 0x55, B: 0x11, A: 0x04}, null],
    // ]);
  });
});
