window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
window.addEventListener("touchstart", onScreenTouchStart, false);
window.addEventListener("touchend", onScreenTouchEnd, false);

function onKeyDown(event) {
  if (event.keyCode === JUMP_KEYCODE) {
    jumpKeyIsPressed = true;
  }
}
function onKeyUp(event) {
  if (event.keyCode === JUMP_KEYCODE) {
    jumpKeyIsPressed = false;
  }
}
function onScreenTouchStart(event) {
  jumpKeyIsPressed = true;
}
function onScreenTouchEnd(event) {
  jumpKeyIsPressed = false;
}
