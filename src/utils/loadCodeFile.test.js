import { assert } from 'chai';
import { loadCodeFile } from './loadCodeFile.mjs';
import { CodeSymbol } from '../core/CodeSymbol.mjs';

describe('utils/loadCodeFile', () => {
  it('loads 2d grid with string values', () => {
    const grid = loadCodeFile([
      [null, '*#FF551104', null],
    ]);

    assert.equal(grid.width, 3);
    assert.equal(grid.height, 1);
    assert.deepEqual(
      Array.from(grid.at(1, 0)),
      [new CodeSymbol('*', 0xFF, 0x55, 0x11, 0x04)],
    );
  });
});
