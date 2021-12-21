import { nextTick, render, reset } from './actions/index.mjs';

// window.IS_RUNNING = true;
// const FRAME_DELAY = 1; // time between frames.

window.CODE_FILE = [
  [null, null, null, null, null, '*#68686c02', null],
  ['*#FF00FF04', null, null, null, null, '*#6C6F2002', null],
  [null, '*#FF000002', null, null, null, '*#776F7202', null],
  [null, null, null, null, null, '*#6c640002', null],
  [null, null, '*#00FF0008', null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

// Get the 2d Context
window.ctx = window.c.getContext('2d');
// Load the code file
reset();
// first render
render();

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
