import { render } from './render.mjs';
import { RULES } from '../symbols/index.mjs';
import { tickCode } from '../core/tickCode.mjs';

/**
 Performs a Tick on window.code, overriding the old state.
 Renders the updated code state.
*/
export function nextTick() {
  // Run the next Tick in the simulation.
  // override the code from the last tick.
  window.code = tickCode(RULES, window.code);
  // Render the Code to the screen.
  render();
}
