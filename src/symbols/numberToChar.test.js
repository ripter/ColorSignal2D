import { assert } from 'chai';

import { GridCell } from '../core/GridCell.mjs';
import { textToCodeSymbol as TOKEN } from '../utils/textToCodeSymbol.mjs';
import { tick, collide } from './numberToChar.mjs';

describe('symbol/numberToChar', () => {
  let numToken;

  beforeEach(() => {
    numToken = TOKEN('#');
  });

  it('tick converts number 1 to char "1"', () => {
    assert.deepEqual(
      tick(1, 1, TOKEN('##00000104')),
      [
        new GridCell(1, 1, TOKEN('##000000')),
        new GridCell(1, 1, TOKEN('*#00003104')),
      ],
    );
  });


  it('collide absorbs the color', () => {
    assert.deepEqual(
      // Call collision with symbol.
      collide(1, 1, numToken, [
        TOKEN('*#000001'),
      ]),
      // absorbs the signal.
      [new GridCell(1, 1, TOKEN('##000001'))],
    );
  });
});
