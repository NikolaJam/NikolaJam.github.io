import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function EnemyLasers(x, y) {
  this.x = x;
  this.y = y;

  this.setPosition = ($element, x, y) => {
    $element.style.transform = `translate(${x}px, ${y}px)`;
  };

  this.createEnemyLaser = ($container, x, y) => {
    var audio = new Audio("sound/Laser_Shoot16.ogg");
    audio.play();
    const $element = document.createElement("img");
    $element.src = "img/laser-green-5.png";
    $element.className = "enemy-laser";
    $container.appendChild($element);

    this.laser = { x, y, $element };
    GAME_STATE.enemyLasers.push(this.laser);
    this.setPosition($element, this.x, this.y);
  };

  this.updateEnemyLasers = (dt, $container) => {
    this.lasers = GAME_STATE.enemyLasers;

    for (let i = 0; i < this.lasers.length; i++) {
      const laser = this.lasers[i];
      laser.y += dt * LASER_MAX_SPEED;

      if (laser.y > GAME_HEIGHT - 30) {
        this.destroyLaser($container, laser);
      }
      this.setPosition(laser.$element, laser.x, laser.y);
    }
    GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
  };

  this.destroyLaser = function($container, laser) {
    $container.removeChild(laser.$element);
    laser.isDead = true;
  };
}
