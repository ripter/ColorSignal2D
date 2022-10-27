import ifRule from './if.mjs';
import mirror from './mirror.mjs';
import output from './output.mjs';
import rotateClockwise from './rotateClockwise.mjs';
import rotateCounterClockwise from './rotateCounterClockwise.mjs';
import signal from './signal.mjs';
import split from './split.mjs';
import numberToChar from './numberToChar.mjs';

/**
 * Default Rules for the language.
 * Each key is the language symbol used in the code grid.
 * Each symbol can have a tick and/or collide function.
 */
export const RULES = {
  '*': signal,
  Ѡ: {
    ...output,
    collide: output.collide.bind(null, (chars) => {
      window.OUTPUT.push(...chars);
    }),
  },
  '#': numberToChar,
  Ɨ: split,
  '|': mirror,
  ʃ: ifRule,
  '/': rotateClockwise,
  '\\': rotateCounterClockwise,
};
