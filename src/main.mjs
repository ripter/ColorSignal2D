import { renderCode } from './renderCode.mjs';
import { tickCode } from './tickCode.mjs';
import { loadCodeFile } from './utils/loadCodeFile.mjs';
import { nextTick } from './actions/nextTick.mjs';
import { reset } from './actions/reset.mjs';

// window.IS_RUNNING = true;
const FRAME_DELAY = 1; // time between frames.

window.CODE_FILE = [
  ['S#0ff', 'E#ff0', '     ', '   ', 'E#ff0'],
  ['', '     ', , , 'S#00f'],
  ['', '     ', 'N#0f0', ,],
  ['', '     ', 'S#00f', ,],
  ['', 'N#f00', 'W#f0f', ,],
];

// Get the 2d Context
const ctx = window.ctx = window.c.getContext('2d');
// Load the code file
reset();
// first render
nextTick();

// Single Step button.
window.btnNext.addEventListener('click', nextTick);
window.btnReset.addEventListener('click', reset);

/*

//
// Run the Code!
let delayTime = 0;
let lastTime = 0;
(function gameLoop() {
  let currentTime = Date.now();
  let delta = (currentTime - lastTime) / 1000;

  if (delayTime > 0) {
    delayTime -= delta;
  }
  else {
    // Render the Code to the screen.
    ctx.font = FONT;
    renderCode(window.ctx, FONT_SIZE.WIDTH, FONT_SIZE.HEIGHT, code);
    // Run the next Tick in the simulation.
    tickCode(code);
    // delay until next tick.
    delayTime = FRAME_DELAY;
  }

  // Update the last time.
  lastTime = currentTime;

  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(gameLoop);
  }
})();

*/
