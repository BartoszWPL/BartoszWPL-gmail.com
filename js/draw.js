function draw() {
  // Screen shake
  var shakenCameraX = cameraX;
  var shakenCameraY = cameraY;
  if (screenshake) {
    shakenCameraX += (Math.random() - 0.5) * SCREENSHAKE_RADIUS;
    shakenCameraY += (Math.random() - 0.5) * SCREENSHAKE_RADIUS;
  }

  // Sky
  c.fillStyle = 'LightSteelBlue';
  c.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y - 40);

  // Background
  var backgroundX = - (shakenCameraX % BACKGROUND_WIDTH);
  c.drawImage(backgroundImage, backgroundX, BACKGROUND_Y_OFFSET);
  c.drawImage(backgroundImage, backgroundX + BACKGROUND_WIDTH, BACKGROUND_Y_OFFSET);

  // Ground
  c.fillStyle = 'MediumSeaGreen';
  c.fillRect(0, GROUND_Y - 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Heart
  var heart_space = 0;
  for (var i = 0; i < heroLives; i++) {
    heart_space += 50;
    c.drawImage(heart, CANVAS_WIDTH - heart_space - 10, 10);
  }
  // Bush
  for (var i = 0; i < bushData.length; i++) {
    c.drawImage(bushData[i].image, bushData[i].x - shakenCameraX, GROUND_Y - bushData[i].y - shakenCameraY);
  }

  // Enemy
  for (var i = 0; i < enemyData.length; i++) {
    drawAnimatedSprite(enemyData[i].x - shakenCameraX, enemyData[i].y - shakenCameraY, enemyData[i].frameNr, enemySpriteSheet);
  }

  // Hero
  drawAnimatedSprite(heroPositionX - shakenCameraX, heroPositionY - shakenCameraY, heroFrameNr, heroSpriteSheet);

  // Distance
  var heroDistance = heroPositionX / 100;
  c.fillStyle = 'black';
  c.font = '48px Acme';
  c.fillText(heroDistance.toFixed(0) + 'm', 20, 40);

  if (gameMode === GAME_OVER_GAME_MODE) {
    c.fillStyle = 'Red';
    c.font = '96px Acme';

    let textPositionX = (CANVAS_WIDTH - c.measureText(GAME_OVER_TEXT).width) / 2;
    let textPositionY = (CANVAS_HEIGHT - 90) / 2;

    c.fillText(GAME_OVER_TEXT, textPositionX.toFixed(0), textPositionY.toFixed(0));
  }
}

function drawAnimatedSprite(screenX, screenY, frameNr, spriteSheet) {
  var spriteSheetRow = Math.floor(frameNr / spriteSheet.nrFramesPerRow);
  var spriteSheetColumn = frameNr % spriteSheet.nrFramesPerRow;
  var spriteSheetX = spriteSheetColumn * spriteSheet.spriteWidth;
  var spriteSheetY = spriteSheetRow * spriteSheet.spriteHeight;
  c.drawImage(
    spriteSheet.image,
    spriteSheetX,
    spriteSheetY,
    spriteSheet.spriteWidth,
    spriteSheet.spriteHeight,
    screenX,
    screenY,
    spriteSheet.spriteWidth,
    spriteSheet.spriteHeight
  );
}
