import { Player } from "/js/player.js";
import { Laser } from "/js/laser.js";
import { Enemies } from "/js/enemies.js";

export function Game() {

  const $container = document.querySelector(".game");
  this.player = new Player($container);
  this.enemy = new Enemies();

  this.initialize = function () {
    this.player.initialize();
    this.enemy.initialize();
  }

  this.update = () => {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
    const $container = document.querySelector(".game");

    this.player.updatePlayer(dt);
    this.player.laser.updateLasers(dt, $container);
    this.enemy.updateEnemies(dt, $container);

    GAME_STATE.lastTime = currentTime;
    window.requestAnimationFrame(this.update);
  }
}
