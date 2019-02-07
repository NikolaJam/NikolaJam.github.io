import { Laser } from "/js/laser.js";
import { GameElement } from "/js/object.js";
export function Player($container) {

  this.x = SCREEN.width / 2;
  this.y = SCREEN.height - 50;
  this.playerWidth = PLAYER.width;
  this.laser = new Laser();
  this.playerSpeed = PLAYER.speed;
  this.cooldown = PLAYER.cooldown;
  GAME_STATE.playerisDead = false;

  this.$avatar = $("<img>").attr("src", "img/player-red-1.png")
    .attr("ID", "player").addClass("player")
    .appendTo($container);

  this.initialize = function () {
    this.setPosition(this.$avatar, this.x, this.y);
  }

  this.updatePlayer = function (dt) {

    if (GAME_STATE.leftPressed) {
      this.x -= dt * this.playerSpeed;                     // dt *this.playerSpeed = dt*500 which means 500px per second
    }
    if (GAME_STATE.rightPressed) {
      this.x += dt * this.playerSpeed;
    }
    this.x = this.constrain(this.x, this.playerWidth, SCREEN.width - this.playerWidth);
    
    if (GAME_STATE.spacePressed && this.cooldown <= 0) {
      this.laser.createLaser($container, this.x, this.y)
      this.cooldown = PLAYER.cooldown;  
    }
    if (this.cooldown > 0) {
      this.cooldown -= dt;
    }
    this.initialize();
  }

  this.destroyElement = () =>{
    GAME_STATE.playerisDead = true;
  }
}

Player.prototype = new GameElement(); 
Player.prototype.constrain = constrain;