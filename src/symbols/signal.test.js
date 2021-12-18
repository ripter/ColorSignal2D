import { assert } from 'chai';
// import sinon from 'sinon';


import { WHITE, asNumber } from '../consts/colors.mjs';
import { tick } from './signal.mjs';


describe('Symbol: * ', () => {
  // should(); // Give everything .should
  let codeGrid;
  beforeEach(() => {
    codeGrid = [
      ['','',''],
      ['','',''],
      ['','',''],
    ];
  });

  it('moves North with Alpha 0b0001', () => {
    codeGrid[1][1] = `*${WHITE}01`;
    const actual = tick(1, 1, asNumber(`${WHITE}01`), codeGrid);

    assert.exists(actual, 'tick should return codeGrid');
    assert.equal(actual[0][1], `*${WHITE}01`, 'Signal should exist in the North Cell');
    assert.notExists(actual[1][1], 'Signal should not be in the old cell.');
  });
  it('moves South with Alpha 0b0010', () => {
    codeGrid[1][1] = `*${WHITE}02`;
    const actual = tick(1, 1, asNumber(`${WHITE}02`), codeGrid);

    assert.exists(actual, 'tick should return codeGrid');
    assert.equal(actual[2][1], `*${WHITE}02`, 'Signal should exist in the South Cell');
    assert.notExists(actual[1][1], 'Signal should not be in the old cell.');
  });
  it('moves East with Alpha 0b0100', () => {
    codeGrid[1][1] = `*${WHITE}04`;
    const actual = tick(1, 1, asNumber(`${WHITE}04`), codeGrid);

    assert.exists(actual, 'tick should return codeGrid');
    assert.equal(actual[1][2], `*${WHITE}04`, 'Signal should exist in the East Cell');
    assert.notExists(actual[1][1], 'Signal should not be in the old cell.');
  });
  it('moves West with Alpha 0b1000', () => {
    codeGrid[1][1] = `*${WHITE}08`;
    const actual = tick(1, 1, asNumber(`${WHITE}08`), codeGrid);

    assert.exists(actual, 'tick should return codeGrid');
    assert.equal(actual[1][0], `*${WHITE}08`, 'Signal should exist in the West Cell');
    assert.notExists(actual[1][1], 'Signal should not be in the old cell.');
  });
});
