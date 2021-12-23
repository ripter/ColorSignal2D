let delayTime = 0;
let lastTime = 0;
export function gameLoop(cbTick) {
  const currentTime = Date.now();
  const delta = (currentTime - lastTime) / 1000;

  if (delayTime > 0) {
    delayTime -= delta;
  } else {
    cbTick(delta);
  }

  // Update the last time.
  lastTime = currentTime;

  // loop as long as the game is running.
  // global for easy debugging on the console.
  if (window.IS_RUNNING) {
    window.requestAnimationFrame(() => gameLoop(cbTick));
  }
}
