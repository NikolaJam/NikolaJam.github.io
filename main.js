
function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}
//sredi so ternar
function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

function createPlayer($container, x, y) {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  $("<img>").attr("src","PNG/playerShip1_red.png").addClass("player").appendTo($container);
  const $player = $(".player")[0];
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function updatePlayer(dt) {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
  }

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  const $player = $(".player")[0];
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function init() {
  const $container = document.querySelector(".game");
  createPlayer($container);
}

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  updatePlayer(dt);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}

init();

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);








 
// const GAME_WIDTH = 800;
// const GAME_HEIGHT = 600;

// const GAME_STATE = {
//   playerX: 0,
//   playerY: 0,
// };

// function setPosition($el, x, y) {
//   $el.style.transform = `translate(${x}px, ${y}px)`;
// }

// function createPlayer($container) {
//     GAME_STATE.playerX = GAME_WIDTH / 2;
//     GAME_STATE.playerY = GAME_HEIGHT - 50;
//   $("<img>").attr("src","PNG/playerShip1_blue.png").addClass("player").appendTo($container);
//   var $player = $(".player:first");
//   setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
// }

// function init() {
//   const $container = $(".game:first");
//   createPlayer($container);
// }

// init();