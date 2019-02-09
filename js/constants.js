const SCREEN = {
  width: 800,
  height: 600,
}

const GAME_STATE = {
  lastTime: Date.now(),
  shiftPressed: false,
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerisDead: false,
  gameOver: false,
  victory: false,

  laserCooldown: 0.5,
  laserSpeed: 500.0,
  playerX: 0,
  playerY: 0,
  cancelAnimation: null,
  enemyLasers: [],
  lasers: [],
  enemies: []
}

const PLAYER = {
  laser: "img/Lasers/laser1.png",
  cooldown: 0.7,
  defaultCooldown: 0.5,
  cheatCooldown: 0.1,
  width: 30,
  speed: 500.0
}

const ENEMIES = {
  enemy: "img/Enemies/enemy1.png",
  enemyLaser: "img/Lasers/enemyLaser0.png",
  perRow: 10,
  numberOfRows: 1,
  horizontalPadding: 80,
  verticalPadding: 80,
  verticalSpacing: 60,
  cooldown: 8.0
}

const KEY = {
  shift: 16,
  left: 65,
  right: 68,
  space: 32
}
