const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 20;
const PLAYER_MAX_SPEED = 400.0;

const KEY_CODE_LEFT = 65;
const KEY_CODE_RIGHT = 68;
const KEY_CODE_SPACE = 32;

const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
};