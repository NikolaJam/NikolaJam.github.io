import { Laser } from "/js/laser.js";
import { GameElement } from "/js/object.js";

export function Player($container, objekt) {

  this.x = SCREEN.width / 2;
  this.y = SCREEN.height - 50;
  this.playerWidth = PLAYER.width;
  this.laser = new Laser();

  this.playerSpeed = PLAYER.speed;
  this.cooldown = PLAYER.cooldown;
  GAME_STATE.playerisDead = false;

  this.$avatar = $("<img>").attr("src", objekt.avatar)
    .attr("ID", "player").addClass("player")
    .prependTo($container);

  this.initialize = function () {
    this.setPosition(this.$avatar, this.x, this.y);
  }

  this.updatePlayer = function (dt) {
    if (objekt.shiftPressed) {
      PLAYER.cooldown = PLAYER.cheatCooldown;
    }
    if (!objekt.shiftPressed) {
      PLAYER.cooldown = PLAYER.defaultCooldown - ((ENEMIES.numberOfRows) / 10);
    }
    if (objekt.leftPressed) {
      this.x -= dt * this.playerSpeed;                     // dt * this.playerSpeed = dt*500 which means ~ 500px per second
    }
    if (objekt.rightPressed) {
      this.x += dt * this.playerSpeed;
    }
    this.x = this.constrain(this.x, this.playerWidth, SCREEN.width - this.playerWidth);

    if (objekt.spacePressed && this.cooldown <= 0) {
      this.laser.createLaser($container, this.x, this.y)
      this.cooldown = PLAYER.cooldown;
    }
    if (this.cooldown > 0) {                              //cooldown of 0.5 is ~ 1 laser every half a second
      this.cooldown -= dt;
    }
    this.setPosition(this.$avatar, this.x, this.y);
  }


}

Player.prototype = new GameElement();
Player.prototype.constrain = constrain;
