import { Laser } from "/js/laser.js";
export function Player($container) {

  this.x = GAME_WIDTH / 2;
  this.y = GAME_HEIGHT - 50;
  this.playerWidth = 20;
  this.laser = new Laser($container, this.x, this.y);
  // this.playerSpeed = 600.0;

  $("<img>").attr("src", "img/player-red-1.png")
    .attr("ID", "player").addClass("player")
    .appendTo($container);
  this.$avatar = $(".player")[0];

  this.initialize = function () {
    this.$avatar.style.transform = `translate(${this.x}px, ${this.y}px)`;                     // Template literals
  }

  this.updatePlayer = function (dt) {

    if (GAME_STATE.leftPressed) {
      this.x -= 8;
      // dt * this.playerSpeed;

    }
    if (GAME_STATE.rightPressed) {

      this.x += 8;
      // dt *this.playerSpeed;      if we want to have a constant movement, no matter the machine we are using.
    }

    this.x = constrain(this.x, this.playerWidth, GAME_WIDTH - this.playerWidth);

    if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {

      console.log("space");
      this.laser.createLaser($container, this.x, this.y)
      GAME_STATE.playerCooldown = LASER_COOLDOWN;
    }
    if (GAME_STATE.playerCooldown > 0) {
      GAME_STATE.playerCooldown -= dt;
    }
    this.initialize();
    const $player = document.querySelector(".player");
  }

  this.destroyPlayer = function ($container) {
    $container.removeChild($avatar);
    GAME_STATE.gameOver = true;
  }
}