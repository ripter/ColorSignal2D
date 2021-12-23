import { gameLoop } from '../gameLoop.mjs';
import { nextTick } from './nextTick.mjs';

let delay = 0;
export function togglePlay(evt) {
  const { IS_RUNNING } = window;
  const { target } = evt;
  if (IS_RUNNING) {
    window.IS_RUNNING = false;
    target.textContent = 'Play';
  } else {
    window.IS_RUNNING = true;
    target.textContent = 'Stop';

    gameLoop((delta) => {
      delay -= delta;
      if (delay > 0) { return; }
      nextTick();
      delay = 0.25;
    });
  }
}
