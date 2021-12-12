import { RULES } from './symbols/index.mjs';

/**
 * Advances the codeGrid by one tick.
 * Returns a new codeGrid from the result of the tick.
 */
export function tickCode(codeGrid) {
  const nextSignals = [];
  const nextCodeGrid = JSON.parse(JSON.stringify(codeGrid));

  for (let y = 0; y < codeGrid.length; y++) {
    for (let x = 0; x < codeGrid[0].length; x++) {
      const { symbol, color } = codeGrid[y][x] ?? { symbol: null, color: null };
      // skip if there is no symbol.
      if (!symbol) { continue; }
      const rule = RULES[symbol];
      // skip if there is no rule for for this symbol.
      if (!rule || !rule.tick) { continue; }

      console.group(symbol);
      console.log('x,y', x, y);
      // Run the symbol's tick function.
      RULES[symbol].tick(x, y, color, nextCodeGrid);
      console.groupEnd();
    }
  }
  return nextCodeGrid;
}
