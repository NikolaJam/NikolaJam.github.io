const SCREEN = {
  width: 800,
  height: 600,
}

const GAME_STATE = {
  lastTime: Date.now(),
  playerisDead: false,
  player2Created: false,
  gameOver: false,
  victory: false,


  laserSpeed: 500.0,
  playerX: 0,
  playerY: 0,
  cancelAnimation: null,
  enemyLasers: [],
  lasers: [],
  enemies: []
}

const PLAYER = {
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  avatar: "img/Heroes/player-red-1.png",
  laser: "img/Lasers/laser1.png",
  cooldown: 0.6,
  defaultCooldown: 0.7,
  cheatCooldown: 0.1,
  width: 30,
  speed: 500.0
}

const PLAYER2 = {
  shiftPressed: false,
  left2Pressed: false,
  right2Pressed: false,
  shoot2Pressed: false,
  avatar: "img/Heroes/player-green-3.png",
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
  num0: 96,
  insert: 45,
  left2: 37,
  right2: 39,
  shift: 16,
  left: 65,
  right: 68,
  space: 32
}
