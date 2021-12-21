import { tick as signalTick, collide as signalCollide } from './signal.mjs';

/**
 * Default Rules for the language.
 * Each key is the language symbol used in the code grid.
 * Each symbol can have a tick and/or collide function.
 */
export const RULES = {
  '*': {
    tick: signalTick,
    collide: signalCollide,
  },
};
