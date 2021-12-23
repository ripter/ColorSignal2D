import { absorb } from './abilities/absorb.mjs';
import mirror from './mirror.mjs';
import output from './output.mjs';
import signal from './signal.mjs';
import split from './split.mjs';

/**
 * Default Rules for the language.
 * Each key is the language symbol used in the code grid.
 * Each symbol can have a tick and/or collide function.
 */
export const RULES = {
  '*': {
    ...signal,
    collide: absorb,
  },
  Ѡ: {
    ...output,
    collide: output.collide.bind(null, (chars) => {
      window.OUTPUT.push(...chars);
    }),
  },
  Ɨ: {
    ...split,
    collide: absorb,
  },
  '|': {
    ...mirror,
    collide: absorb,
  },
};
