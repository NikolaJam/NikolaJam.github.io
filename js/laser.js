import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function Laser() {
  this.x;
  this.y;
  
  this.setPosition = ($container, x, y) => {
    $container.style.transform = `translate(${x}px, ${y}px)`;
  }

  this.createLaser = ($container, x, y) => {
    this.x=x;
    this.y=y;
    this.$element = document.createElement("img");
    this.$element.src = "img/laser-red-12.png";
    this.$element.className = "laser";
    $container.appendChild(this.$element);
   
    this.laser = { 
      isDead: false,
      x: this.x,
      y: this.y,
      $element: this.$element };
    var audio = new Audio("sound/WPN_Pistol_AlienBlaster_Fire_Player_01.ogx");
    audio.play();
    GAME_STATE.lasers.push(this.laser);
  }

  this.destroyLaser = function ($container, laser) {
    $container.removeChild(laser.$element);
    laser.isDead = true;
  }

  this.updateLasers = function (dt, $container) {
    const lasers = GAME_STATE.lasers;

    for (var i = 0; i < lasers.length; i++) {
      const laser = lasers[i];
      laser.y -= dt * GAME_STATE.laserSpeed;

      if (laser.y <= 0) {
        this.destroyLaser($container, laser);
      }

      this.setPosition(laser.$element, laser.x, laser.y);
    }
    GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);    
  } 
}
