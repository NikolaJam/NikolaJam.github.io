import { Laser } from "/js/laser.js";
import { GameElement } from "/js/object.js";
export function Player2($container) {

  this.x = SCREEN.width / 2;
  this.y = SCREEN.height - 50;
  this.playerWidth = PLAYER.width;
  this.laser = new Laser();
  this.playerSpeed = PLAYER.speed;
  this.cooldown = PLAYER.cooldown;
  GAME_STATE.playerisDead = false;

  this.$avatar = $("<img>").attr("src", "img/player-green-2.png")
    .attr("ID", "player").addClass("player")
    .prependTo($container);

  this.initialize = function () {
    this.setPosition(this.$avatar, this.x, this.y);         
  }

  this.updatePlayer = function (dt) {
    if (GAME_STATE.shiftPressed) {
      PLAYER.cooldown = PLAYER.cheatCooldown;
    }
    if (!GAME_STATE.shiftPressed) {
      PLAYER.cooldown = PLAYER.defaultCooldown - ((ENEMIES.numberOfRows) / 10);
    }
    if (GAME_STATE.left2Pressed) {
        this.x -= dt * this.playerSpeed;                    
      }
      if (GAME_STATE.right2Pressed) {
        this.x += dt * this.playerSpeed;
      }
    this.x = this.constrain(this.x, this.playerWidth, SCREEN.width - this.playerWidth);

    if (GAME_STATE.shoot2Pressed && this.cooldown <= 0) {
      this.laser.createLaser($container, this.x, this.y)
      this.cooldown = PLAYER.cooldown;
    }
    if (this.cooldown > 0) {                             
      this.cooldown -= dt;
    }
    this.setPosition(this.$avatar, this.x, this.y);
  }

  this.destroyElement = () => {
    GAME_STATE.playerisDead = true;
  }
}

Player2.prototype = new GameElement();
Player2.prototype.constrain = constrain;

