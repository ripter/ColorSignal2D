import { render } from './render.mjs';
import { tickCode } from '../core/tickCode.mjs';

/**
 Performs a Tick on window.code, overriding the old state.
 Renders the updated code state.
*/
export function nextTick() {
  // Run the next Tick in the simulation.
  // override the code from the last tick.
  window.code = tickCode(window.code);
  // Render the Code to the screen.
  render();
}
