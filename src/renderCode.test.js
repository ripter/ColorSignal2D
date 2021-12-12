import { should } from 'chai';
import { renderCode } from './renderCode.js';

// Setup Should style testing.
should();

describe('renderCode', () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      fillText: () => {},
      fillRect: () => {},
    };
  });

  it('renders', () => {
    renderCode(ctx, 8, 8, [[{ symbol: 'N', color: '#F00' }]]);

    // expect(ctx.fillStyle).toEqual('#F00');
    ctx.fillStyle.should.equal('#F00');
  });
});
