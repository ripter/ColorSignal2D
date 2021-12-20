import { assert } from 'chai';
import sinon from 'sinon';

import { tickCode } from './tickCode.mjs';


describe('core/tickCode', () => {
  let rules, grid;
  beforeEach(() => {
    rules = {
      '*': {
        tick: sinon.fake.returns([
          { x: 1, y: 0, cell: {symbol: '*'} },
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
    assert.include(rules['*'].tick.args[0][1], {symbol: '*'}, 'Second arg is the cell data');
    assert.equal(rules['*'].tick.args[0][2], grid, 'Third arg is a refrence to the grid.');
  });

  it('returns a new grid', () => {
    const actual = tickCode(rules, grid);
    assert.exists(actual);
    assert.equal(actual[0][0], null, 'Old position has been cleared.');
    assert.include(actual[0][1], {symbol: '*'}, 'New position has the Cell data.');
  });


  describe('grid limits', () => {
    it('left bounds', () => {
      const actual = tickCode({
        '*': {tick: () => [
          { x: 0, y: 0, cell: null }, // remove the existing.
          { x: -1, y: 0, cell: {symbol: '*'} }, // attempt to move off the left side.
        ]}
      }, grid);
      assert.deepEqual(actual, [
        [null, null, null],
        [null, null, null],
      ]);
    });

    it('right bounds', () => {
      const actual = tickCode({
        '*': {tick: () => [
          { x: 0, y: 0, cell: null }, // remove the existing.
          { x: 4, y: 0, cell: {symbol: '*'} }, // attempt to move off the right side.
        ]}
      }, grid);
      assert.deepEqual(actual, [
        [null, null, null],
        [null, null, null],
      ]);
    });

    it('top bounds', () => {
      const actual = tickCode({
        '*': {tick: () => [
          { x: 0, y: 0, cell: null }, // remove the existing.
          { x: 0, y: -1, cell: {symbol: '*'} }, // attempt to move off the top side.
        ]}
      }, grid);
      assert.deepEqual(actual, [
        [null, null, null],
        [null, null, null],
      ]);
    });

    it('bottom bounds', () => {
      const actual = tickCode({
        '*': {tick: () => [
          { x: 0, y: 0, cell: null }, // remove the existing.
          { x: 0, y: 2, cell: {symbol: '*'} }, // attempt to move off the bottom side.
        ]}
      }, grid);
      assert.deepEqual(actual, [
        [null, null, null],
        [null, null, null],
      ]);
    });

  });
});
