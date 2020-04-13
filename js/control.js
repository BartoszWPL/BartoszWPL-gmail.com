window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
window.addEventListener("touchstart", onScreenTouchStart, false);
window.addEventListener("touchend", onScreenTouchEnd, false);

function onKeyDown(event) {
  keyPressed(event.keyCode, true);
}
function onKeyUp(event) {
  keyPressed(event.keyCode, false);
}
function onScreenTouchStart(event) {
  jumpKeyIsPressed = true;
  startKeyIsPressed = true;
}
function onScreenTouchEnd(event) {
  jumpKeyIsPressed = false;
  startKeyIsPressed = false;
}

function keyPressed(keyCode, isPressed) {
  switch (keyCode) {
    case JUMP_KEYCODE:
      jumpKeyIsPressed = isPressed;
      break;
    case START_KEYCODE:
      startKeyIsPressed = isPressed;
      break;
  }
}
