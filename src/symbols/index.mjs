import { tick as signalTick } from './signal.mjs';

export const RULES = {
  '*': {
    tick: signalTick,
  },
};
