import { assert, should } from 'chai';
import sinon from 'sinon';

import { loadCodeFile } from '../utils/loadCodeFile.mjs';
import { renderCode } from './renderCode.mjs';

// Setup Should style testing.
should();

describe('renderCode', () => {
  let ctx; let
    grid;
  beforeEach(() => {
    ctx = {
      fillText: sinon.fake(),
      fillRect: sinon.fake(),
      beginPath: sinon.fake(),
      closePath: sinon.fake(),
      strokeText: sinon.fake(),
      stroke: sinon.fake(),
      moveTo: sinon.fake(),
      lineTo: sinon.fake(),
    };

    grid = loadCodeFile([
      ['*#FF851B'],
    ]);
  });

  it('renders', () => {
    renderCode(ctx, 8, 8, grid);
    assert.equal(ctx.fillStyle, '#FF851B', 'Color is set from RGB values');
    assert.equal(ctx.fillText.args[0][0], '*', 'CodeSymbol rendered as text');
  });

  it('renders text from the bottom so the top line is visible.', () => {
    renderCode(ctx, 8, 8, grid);
    ctx.fillText.args[0][1].should.equal(0);
    ctx.fillText.args[0][2].should.equal(8);
  });

  it('clears the canvas before rendering text.', () => {
    renderCode(ctx, 8, 8, loadCodeFile([
      [null, null],
      ['*#000000', null],
    ]));
    ctx.fillRect.args[0][0].should.equal(0);
    ctx.fillRect.args[0][1].should.equal(0);
    ctx.fillRect.args[0][2].should.equal(16);
    ctx.fillRect.args[0][3].should.equal(16);
  });

  it('renders black symbols with an outline', () => {
    renderCode(ctx, 8, 8, loadCodeFile([
      ['*#000000'],
    ]));

    assert.equal(ctx.strokeStyle, '#FFFFFF', 'Stroke is white');
    assert.equal(ctx.strokeText.args[0][0], '*', 'CodeSymbol rendered as text');
  });
});
