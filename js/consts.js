var MAX_CANVAS_WIDTH = 1920;
var MAX_CANVAS_HEIGHT = 1080;
var CANVAS_WIDTH = setWindowWidth();
var CANVAS_HEIGHT = setWindowHeight();
var GROUND_FROM_DOWN_DISTANCE = 100;
var GROUND_Y = setGroundY();
var BACKGROUND_WIDTH = 1920;
var BACKGROUND_Y_OFFSET = setBackgroundYOffset();
var JUMP_KEYCODE = 32;
var MIN_DISTANCE_BETWEEN_ENEMYS = 400;
var MAX_DISTANCE_BETWEEN_ENEMYS = 1200;
var MAX_ACTIVE_ENEMY = 3;
var SCREENSHAKE_RADIUS = 16;
var START_GAME_MODE = 0;
var PLAY_GAME_MODE = 1;
var GAME_OVER_GAME_MODE = 2;
var GAME_OVER_TEXT = 'GAME OVER'

var HERO_WIDTH = 181;
var HERO_HEIGHT = 229;
var HERO_Y_ACCELERATION = 1;
var HERO_JUMP_SPEED = 18;
var HERO_X_SPEED = 5;
var HERO_NR_ANIMATION_FRAMES = 7;
var HERO_ANIMATION_SPEED = 4;
var HERO_MAX_HEALTH = 100;

var ENEMY_WIDTH = 141;
var ENEMY_HEIGHT = 139;
var ENEMY_NR_ANIMATION_FRAMES = 9;
var ENEMY_ANIMATION_SPEED = 5;
var ENEMY_X_SPEED = 4;

function setWindowWidth() {
  return (window.innerWidth < MAX_CANVAS_WIDTH) ? window.innerWidth : MAX_CANVAS_WIDTH;
}
function setWindowHeight() {
  return (window.innerHeight < MAX_CANVAS_HEIGHT) ? window.innerHeight : MAX_CANVAS_HEIGHT;
}
function setGroundY() {
  return (CANVAS_HEIGHT - GROUND_FROM_DOWN_DISTANCE);
}
function setBackgroundYOffset() {
  if (MAX_CANVAS_HEIGHT > window.innerHeight) {
    return - (150 + MAX_CANVAS_HEIGHT - window.innerHeight - GROUND_FROM_DOWN_DISTANCE);
  } else {
    return 0
  }
}
