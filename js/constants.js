const SCREEN = {
  width: 800,
  height: 600,
}

const GAME_STATE = {
  lastTime: Date.now(),

  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerisDead: false,
  gameOver: false,

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
  cooldown: 0.5,
  width: 30,
  speed: 500.0
}

const ENEMIES = {
  perRow: 10,
  numberOfRows: 3,
  horizontalPadding: 80,
  verticalPadding: 70,
  verticalSpacing: 80,
  cooldown: 10.0
}

const KEY = {
  left: 65,
  right: 68,
  space: 32
}
