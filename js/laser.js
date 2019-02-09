import { GameElement } from "/js/object.js";

export function Laser() {

  this.createLaser = ($container, x, y) => {
    this.x=x;
    this.y=y;
    
    this.$element = $("<img>").attr("src", PLAYER.laser).addClass("laser").appendTo($container);
    this.laser = { 
      isDead: false,
      x: this.x,
      y: this.y,
      $element: this.$element };
    var audio = new Audio("sound/WPN_Pistol_AlienBlaster_Fire_Player_01.ogx");
    audio.play();
    GAME_STATE.lasers.push(this.laser);
  }

  this.updateLasers = function (dt) {
    const lasers = GAME_STATE.lasers;

    for (var i = 0; i < lasers.length; i++) {
      const laser = lasers[i];
      laser.y -= dt * GAME_STATE.laserSpeed;

      if (laser.y <= 0) {
        this.destroyElement(laser);
        laser.isDead = true;
      }
      this.setPosition(laser.$element, laser.x, laser.y);
    }
    GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);    
  } 
}

Laser.prototype = new GameElement();