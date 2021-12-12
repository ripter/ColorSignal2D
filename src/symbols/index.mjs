import { N } from './N.mjs';
import { signalTick } from './signal.mjs';

export const RULES = {
  N: {
    tick: signalTick(0, -1),
  },
  S: {
    tick: signalTick(0, 1),
  },
  E: {
    tick: signalTick(1, 0),
  },
  W: {
    tick: signalTick(-1, 0),
  },
};
