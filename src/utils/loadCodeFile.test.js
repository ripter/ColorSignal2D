import { assert } from 'chai';
import { loadCodeFile } from './loadCodeFile.mjs';

describe('utils/loadCodeFile', () => {
  it('loads entire grid', () => {
    const actual = loadCodeFile([
      [null, '*#FF551104', null],
    ]);
    assert.exists(actual[0][1]);
    assert.equal(actual[0][1].symbol, '*');
    assert.equal(actual[0][1].R, 0xFF);
    assert.equal(actual[0][1].G, 0x55);
    assert.equal(actual[0][1].B, 0x11);
    assert.equal(actual[0][1].A, 0x04);
  });
});
