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
  if (gameMode !== START_GAME_MODE) {
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
    setFont('46px Acme', 'black')
    c.fillText(heroDistance.toFixed(0) + 'm', 20, 40);
  }

  if (gameMode === GAME_OVER_GAME_MODE) {
    setFont('96px Acme', 'red')
    let textPositionX = (CANVAS_WIDTH - c.measureText(GAME_OVER_TEXT).width) / 2;
    let textPositionY = (CANVAS_HEIGHT - 90) / 2;

    c.fillText(GAME_OVER_TEXT, textPositionX.toFixed(0), textPositionY.toFixed(0));

    setFont('46px Acme', 'black')
    let restartTextPositionX = (CANVAS_WIDTH - c.measureText(START_GAME_TEXT).width) / 2;
    let restartTextPositionY = ((CANVAS_HEIGHT - 90) / 2) + 60;

    c.fillText(START_GAME_TEXT, restartTextPositionX.toFixed(0), restartTextPositionY.toFixed(0));

    if (startKeyIsPressed) {
      resetGameState();
    };
  }

  // Start screen
  if (gameMode === START_GAME_MODE) {
    startGameState();
    startGameFrameCounter = startGameFrameCounter + 1;
    drawAnimatedSprite(heroPositionX, heroPositionY, heroFrameNr, heroSpriteSheet);
    updateAnimation(startGameFrameCounter);
    startGameSubtitles();

    if (startKeyIsPressed) {
      resetGameState();
      gameMode = PLAY_GAME_MODE;
    }
  }
}

function startGameSubtitles() {
  setFont('96px Acme', 'red')
  let textPositionX = (CANVAS_WIDTH - c.measureText(HELLO_GAME_TEXT).width) / 2;
  let textPositionY = (CANVAS_HEIGHT - 90) / 2;
  c.fillText(HELLO_GAME_TEXT, textPositionX.toFixed(0), textPositionY.toFixed(0));

  setFont('46px Acme', 'black')
  let restartTextPositionX = (CANVAS_WIDTH - c.measureText(START_GAME_TEXT).width) / 2;
  let restartTextPositionY = ((CANVAS_HEIGHT - 90) / 2) + 60;
  c.fillText(START_GAME_TEXT, restartTextPositionX.toFixed(0), restartTextPositionY.toFixed(0));

  setFont('28px Acme', 'black')
  let authorTextPosition1X = (CANVAS_WIDTH - c.measureText(HELLO_GAME_AUTHOR_TEXT_1).width) / 2;
  c.fillText(HELLO_GAME_AUTHOR_TEXT_1, authorTextPosition1X, 50);

  let authorTextPosition2X = (CANVAS_WIDTH - c.measureText(HELLO_GAME_AUTHOR_TEXT_2).width) / 2;
  c.fillText(HELLO_GAME_AUTHOR_TEXT_2, authorTextPosition2X, 80);
}

function setFont(font, fontColor) {
  c.fillStyle = fontColor;
  c.font = font;
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
