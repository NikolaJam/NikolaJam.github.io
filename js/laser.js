import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function Laser($container, x, y) {
  this.x = x;
  this.y = y;
  this.r1 = [];
  this.r2 = [];
  this.setPosition = ($container, x, y) => {
    $container.style.transform = `translate(${x}px, ${y}px)`;
  }

  this.createLaser = ($container, x, y) => {
    var audio = new Audio("sound/Laser_Shoot9.ogg");
    audio.play();
    const $element = document.createElement("img");
    $element.src = "img/laser-red-12.png";
    $element.className = "laser";
    $container.appendChild($element);
    
    this.laser = { x, y, $element };
    
    GAME_STATE.lasers.push(this.laser);
  }
  this.rectsIntersect = ($r1, $r2) => {
    var bool = ($r2.left > $r1.right || $r2.right < $r1.left || $r2.top > $r1.bottom || $r2.bottom < $r1.top);
    return !( bool );
  }
  
  this.updateLasers = function (dt, $container) {
    const lasers = GAME_STATE.lasers;
    for (var i = 0; i < lasers.length; i++) {
      const laser = lasers[i];
      laser.y -= dt * LASER_MAX_SPEED;
      if (laser.y < 0) {
        this.destroyLaser($container, laser);
      }
      this.setPosition(laser.$element, laser.x, laser.y);
      var las = laser.$element;
      var laserRect = las.getBoundingClientRect();
      GAME_STATE.laserDomRect.push(laserRect);

      console.log(this.r1[i]);
    }

    GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);     //TODO hit testing and enemy destroying
  }
  this.destroyLaser = function ($container, laser) {
    $container.removeChild(laser.$element);
    laser.isDead = true;
  }
}