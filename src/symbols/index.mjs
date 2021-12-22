import signal from './signal.mjs';
import { collide as outputCollide } from './output.mjs';

/**
 * Default Rules for the language.
 * Each key is the language symbol used in the code grid.
 * Each symbol can have a tick and/or collide function.
 */
export const RULES = {
  '*': signal,
  Ѡ: {
    collide: outputCollide.bind(null, (chars) => {
      window.OUTPUT.push(...chars);
    }),
  },
};
