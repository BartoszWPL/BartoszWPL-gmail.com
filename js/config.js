var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

var heroImage = new Image();
var enemyImage = new Image();
var backgroundImage = new Image();
var bush1Image = new Image();
var bush2Image = new Image();
var heart = new Image();
heroImage.src = 'images/animatedHero.png';
enemyImage.src = 'images/animatedRobot.png';
backgroundImage.src = 'images/background2.png';
bush1Image.src = 'images/bush1.png';
bush2Image.src = 'images/bush2.png';
heart.src = 'images/heart.png';

var heroSpriteSheet = {
  nrFramesPerRow: 5,
  spriteWidth: HERO_WIDTH,
  spriteHeight: HERO_HEIGHT,
  image: heroImage
};

var enemySpriteSheet = {
  nrFramesPerRow: 3,
  spriteWidth: ENEMY_WIDTH,
  spriteHeight: ENEMY_HEIGHT,
  image: enemyImage
};

var heroCollisionRectangle = {
  xOffset: 60,
  yOffset: 20,
  width: 50,
  height: 200
};

var enemyCollisionRectangle = {
  xOffset: 60,
  yOffset: 20,
  width: 50,
  height: 100
};

var enemyData = [];

//var heroHealth = HERO_MAX_HEALTH;
var heroLives = HERO_MAX_HEALTH;
var heroLivesFlag = true;
var heroPositionX = CANVAS_WIDTH / 2;
var heroPositionY = -180;
var heroYSpeed = 0;
var jumpKeyIsPressed = false;
var heroIsInTheAir = true;
var heroFrameNr = 0;
var gameFrameCounter = 0;
var screenshake = false;
var gameMode = PLAY_GAME_MODE;

var cameraX = 0;
var cameraY = 0;

var bushData = generateBushes();

function generateBushes() {
  var generatedBushData = [];
  var bushX = 0;
  while (bushX < (2 * CANVAS_WIDTH)) {
    var bushImage;
    if (Math.random() >= 0.5) {
      bushImage = bush1Image;
    } else {
      bushImage = bush2Image;
    }
    generatedBushData.push({
      x: bushX,
      y: 80 + Math.random() * 20,
      image: bushImage
    });
    bushX += 150 + Math.random() * 200;
  }
  return generatedBushData;
}
