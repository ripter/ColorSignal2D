import { assert } from 'chai';
import sinon from 'sinon';

import { tickCode } from './tickCode.mjs';


describe('core/tickCode', () => {
  let rules, grid;
  beforeEach(() => {
    rules = {
      '*': {
        tick: sinon.fake.returns([
          { x: 1, y: 0, cell: {symbol: '*', color: 0xFFFFFF, config: 0x04} },
          { x: 0, y: 0, cell: null },
        ]),
      },
    };
    grid = [
      [{symbol: '*', color: 0xFFFFFF, config: 0x00}, null, null],
      [null, null, null],
    ];
  });

  it('passes args to tick rule', () => {
    const actual = tickCode(rules, grid);
    assert.isTrue(rules['*'].tick.calledOnce);
    assert.include(rules['*'].tick.args[0][0], {x: 0, y: 0}, 'First arg is the position');
    assert.include(rules['*'].tick.args[0][1], {symbol: '*', color: 0xFFFFFF, config: 0x00}, 'Second arg is the cell data');
    assert.equal(rules['*'].tick.args[0][2], grid, 'Third arg is a refrence to the grid.');
  });

  it('returns a new grid', () => {
    const actual = tickCode(rules, grid);
    assert.exists(actual);
    assert.equal(actual[0][0], null, 'Old position has been cleared.');
    assert.include(actual[0][1], {symbol: '*', color: 0xFFFFFF, config: 0x04}, 'New position has the Cell data.');
  });
});
