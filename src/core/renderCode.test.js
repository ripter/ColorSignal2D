import { assert, should } from 'chai';
import sinon from 'sinon';

import { renderCode } from './renderCode.mjs';

// Setup Should style testing.
should();

describe('renderCode', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      fillText: sinon.fake(),
      fillRect: sinon.fake(),
      beginPath: sinon.fake(),
      closePath: sinon.fake(),
      stroke: sinon.fake(),
      moveTo: sinon.fake(),
      lineTo: sinon.fake(),
    };
  });

  it('renders', () => {
    renderCode(ctx, 8, 8, [
      [{
        symbol: '*', R: 0xFF, G: 0x00, B: 0x00, A: 0x04,
      }],
    ]);
    assert.equal(ctx.fillStyle, '#FF0000', 'Color is set from RGB values');
    assert.equal(ctx.fillText.args[0][0], '*', 'Symbol rendered as text');
  });

  it('renders text from the bottom so the top line is visible.', () => {
    renderCode(ctx, 8, 8, [
      [{
        symbol: '*', R: 0xFF, G: 0x00, B: 0x00, A: 0x04,
      }],
    ]);
    ctx.fillText.args[0][1].should.equal(0);
    ctx.fillText.args[0][2].should.equal(8);
  });

  it('clears the canvas before rendering text.', () => {
    renderCode(ctx, 8, 8, [
      [{
        symbol: '*', R: 0xFF, G: 0x00, B: 0x00, A: 0x04,
      }, null],
      [null, null],
    ]);
    ctx.fillRect.args[0][0].should.equal(0);
    ctx.fillRect.args[0][1].should.equal(0);
    ctx.fillRect.args[0][2].should.equal(16);
    ctx.fillRect.args[0][3].should.equal(16);
  });
});
