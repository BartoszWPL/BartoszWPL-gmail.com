function update() {
  if (gameMode != PLAY_GAME_MODE) { return };
  gameFrameCounter = gameFrameCounter + 1;
  heroPositionX = heroPositionX + HERO_X_SPEED;
  if (jumpKeyIsPressed && !heroIsInTheAir) {
    heroYSpeed = -HERO_JUMP_SPEED;
    heroIsInTheAir = true;
  };
  heroPositionY = heroPositionY + heroYSpeed;
  heroYSpeed = heroYSpeed + HERO_Y_ACCELERATION;
  if (heroPositionY > (GROUND_Y - HERO_HEIGHT) ) {
    heroPositionY = GROUND_Y - HERO_HEIGHT;
    heroYspeed = 0;
    heroIsInTheAir = false;
  }

// update animation
  if (heroFrameNr >= HERO_NR_ANIMATION_FRAMES) {
    heroFrameNr = 0;
  }
  if ((gameFrameCounter % HERO_ANIMATION_SPEED) === 0) {
    heroFrameNr = heroFrameNr + 1;
    if (heroFrameNr >= HERO_NR_ANIMATION_FRAMES) {
      heroFrameNr = 0;
    }
  }

// update camera
  cameraX = heroPositionX - 100;

// update bush
  for (var i=0; i < bushData.length; i++) {
    if ((bushData[i].x - cameraX) < -CANVAS_WIDTH) {
      bushData[i].x += (2 * CANVAS_WIDTH) + 150;
    }
  }

// update enemy
  screenshake = false;
  var heroTouchedAEnemy = updateEnemy();
  if (heroTouchedAEnemy) {
    screenshake = true;
    if ((heroLives > 0) && heroLivesFlag) {
      heroLives -= 1;
      heroLivesFlag = false;
    }
  } else {
    heroLivesFlag = true;
  }

// check if game over
  if (heroLives <= 0) {
    gameMode = GAME_OVER_GAME_MODE;
    screenshake = false;
  }
}

function updateEnemy() {
  var heroTouchedAEnemy = false;
  for (var i = 0; i < enemyData.length; i++) {
    if (doesHeroOverlapEnemy(
          heroPositionX + heroCollisionRectangle.xOffset,
          heroPositionY + heroCollisionRectangle.yOffset,
          heroCollisionRectangle.width,
          heroCollisionRectangle.height,
          enemyData[i].x + enemyCollisionRectangle.xOffset,
          enemyData[i].y + enemyCollisionRectangle.yOffset,
          enemyCollisionRectangle.width,
          enemyCollisionRectangle.height
        )) {
      heroTouchedAEnemy = true;
    }
    enemyData[i].x -= ENEMY_X_SPEED;
    if ((gameFrameCounter % ENEMY_ANIMATION_SPEED) === 0) {
      enemyData[i].frameNr = enemyData[i].frameNr + 1;
      if (enemyData[i].frameNr >= ENEMY_NR_ANIMATION_FRAMES) {
        enemyData[i].frameNr = 0;
      }
    }
  }

  var enemyIndex = 0;
  while (enemyIndex < enemyData.length) {
    if (enemyData[enemyIndex].x < cameraX - ENEMY_WIDTH) {
      enemyData.splice(enemyIndex, 1);
    } else {
      enemyIndex += 1;
    }
  }

  if (enemyData.length < MAX_ACTIVE_ENEMY) {
    var lastEnemyX = CANVAS_WIDTH;
    if (enemyData.length > 0) {
      lastEnemyX = enemyData[enemyData.length - 1].x;
    }
    var newEnemyX = lastEnemyX + MIN_DISTANCE_BETWEEN_ENEMYS + Math.random() * (MAX_DISTANCE_BETWEEN_ENEMYS - MIN_DISTANCE_BETWEEN_ENEMYS);
    enemyData.push({ x: newEnemyX, y: GROUND_Y - ENEMY_HEIGHT, frameNr: 0 });
  }
  return heroTouchedAEnemy;
}

function doesHeroOverlapEnemyAlongOneAxis(heroNearX, heroFarX, enemyNearX, enemyFarX) {
  var heroOverlapsNearEnemyEdge = (heroFarX >= enemyNearX) && (heroFarX <= enemyFarX);
  var heroOverlapsFarEnemyEdge = (heroNearX >= enemyNearX) && (heroNearX <= enemyFarX);
  var heroOverlapsEntireEnemyEdge = (heroNearX <= enemyNearX) && (heroFarX >= enemyFarX);
  return heroOverlapsNearEnemyEdge || heroOverlapsFarEnemyEdge || heroOverlapsEntireEnemyEdge;
}

function doesHeroOverlapEnemy(heroX, heroY, heroWidth, heroHeight, enemyX, enemyY, enemyWidth, enemyHeight) {
  var heroOverlapsEnemyOnXAxis = doesHeroOverlapEnemyAlongOneAxis(heroX, heroX + heroWidth, enemyX, enemyX + enemyWidth);
  var heroOverlapsEnemyOnYAxis = doesHeroOverlapEnemyAlongOneAxis(heroY, heroY + heroHeight, enemyY, enemyY + enemyHeight);
  return heroOverlapsEnemyOnXAxis && heroOverlapsEnemyOnYAxis;
}
