import { Player } from "/js/player.js";
import { Laser } from "/js/laser.js";
import { Enemies } from "/js/enemies.js";

export function Game() {
  const $container = document.querySelector(".game");
  this.player = new Player($container);
  this.enemy = new Enemies();

  this.initialize = function() {
    this.player.initialize();
    this.enemy.initialize();
  };
  this.rectsIntersect = ($r1, $r2) => {
    return !(
      $r2.left > $r1.right ||
      $r2.right < $r1.left ||
      $r2.top > $r1.bottom ||
      $r2.bottom < $r1.top
    );
  };

  this.update = () => {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
    const $container = document.querySelector(".game");

    for (
      var laserNumber = 0;
      laserNumber < GAME_STATE.lasers.length;
      laserNumber++
    ) {
      for (
        var enemiesNumber = 0;
        enemiesNumber < GAME_STATE.enemies.length;
        enemiesNumber++
      ) {
        var $r1 = GAME_STATE.enemies[
          enemiesNumber
        ].$element.getBoundingClientRect();
        var $r2 = GAME_STATE.lasers[
          laserNumber
        ].$element.getBoundingClientRect();

        if (this.rectsIntersect($r1, $r2)) {
          this.player.laser.destroyLaser(
            $container,
            GAME_STATE.lasers[laserNumber]
          );
          this.enemy.destroyEnemy(
            $container,
            GAME_STATE.enemies[enemiesNumber]
          );
          console.log("Intersect");
          break;
        }
      }
    }
    this.player.updatePlayer(dt);
    this.player.laser.updateLasers(dt, $container);
    this.enemy.updateEnemies(dt, $container);
    this.enemy.enemyLaser.updateEnemyLasers(dt, $container);
    GAME_STATE.lastTime = currentTime;
    const gameOver = window.requestAnimationFrame(this.update);
    if (GAME_STATE.enemies.length === 0 && GAME_STATE.lasers.length === 0 && GAME_STATE.enemyLasers.length === 0) {
      console.log("WIN");
      this.player.$avatar.style.display = "none";

      window.cancelAnimationFrame(gameOver);
    }
  };
}
