import {
  nextTick, render, reset, togglePlay,
} from './actions/index.mjs';
// import DEFAULT_CODE from './DEFAULT_CODE.mjs';
import DEFAULT_CODE from './examples/adder.mjs';

// window.IS_RUNNING = true;
window.OUTPUT = [];
window.CODE_FILE = DEFAULT_CODE;

// Get the 2d Context
window.ctx = window.c.getContext('2d');
// Load the code file
reset();
// first render
render();

// Single Step button.
window.btnNext.addEventListener('click', nextTick);
window.btnReset.addEventListener('click', reset);
window.btnTogglePlay.addEventListener('click', togglePlay);
