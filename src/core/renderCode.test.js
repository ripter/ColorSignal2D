import { should } from 'chai';
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
    };
  });

  it('renders', () => {
    renderCode(ctx, 8, 8, [
      [{symbol: '*', color: 0xFF0000, config: 0x04}]
    ]);
    ctx.fillStyle.should.equal(0xFF0000);
  });

  it('renders text from the bottom so the top line is visible.', () => {
    renderCode(ctx, 8, 8, [
      [{symbol: '*', color: 0xFF0000, config: 0x04}]
    ]);
    ctx.fillText.args[0][0].should.equal('*');
    ctx.fillText.args[0][1].should.equal(0);
    ctx.fillText.args[0][2].should.equal(8);
  });

  it('clears the canvas before rendering text.', () => {
    renderCode(ctx, 8, 8, [
      [{symbol: '*', color: 0xFF0000, config: 0x04}, null],
      [null, null]
    ]);
    ctx.fillRect.args[0][0].should.equal(0);
    ctx.fillRect.args[0][1].should.equal(0);
    ctx.fillRect.args[0][2].should.equal(16);
    ctx.fillRect.args[0][3].should.equal(16);
  });
});
