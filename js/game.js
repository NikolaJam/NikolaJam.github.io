import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function Game() {

  const $container = document.querySelector(".game");

  this.initialize = () => {
    this.player = new Player($container);
    this.enemy = new Enemies();
    this.player.initialize();
    this.enemy.initialize();
    this.$player = document.querySelector(".player");
  }

  this.rectsIntersect = ($r1, $r2) => {
    return !($r2.left > $r1.right || $r2.right < $r1.left || $r2.top > $r1.bottom || $r2.bottom < $r1.top);
  }

  this.gameOverProcedure = () => {
    $container.innerHTML = "";
    $("header").html("Hint: avoid the lasers!");
    $("footer").html("Press the button to restart the game");
    this.$gameOver = $("<div>").addClass("game-over").attr("id", "game-over").css("display", "block").appendTo(".game-wrapper");
    $("<h1>").html("GAME OVER").appendTo(this.$gameOver);
    $("<h2>").html("You Lose").addClass("title").attr("data-spliting", "lines").appendTo(this.$gameOver);
    $("<button>").html("Restart Game").addClass("btn").appendTo(this.$gameOver).on("click", function () {
      window.location.reload();
    });
    console.log("GAMEOVER");
    return;
  }

  this.update = () => {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
    var $container = document.querySelector(".game");

    for (var laserNumber = 0; laserNumber < GAME_STATE.lasers.length; laserNumber++) {              //vidi so filter isDead Laser?
      for (var enemiesNumber = 0; enemiesNumber < GAME_STATE.enemies.length; enemiesNumber++) {

        var $r1 = GAME_STATE.enemies[enemiesNumber].$element.getBoundingClientRect();
        var $r2 = GAME_STATE.lasers[laserNumber].$element.getBoundingClientRect();

        if (this.rectsIntersect($r1, $r2)) {
          if (GAME_STATE.lasers[laserNumber].y > 1) {
            this.player.laser.destroyLaser($container, GAME_STATE.lasers[laserNumber]);
          }
          this.enemy.destroyEnemy($container, GAME_STATE.enemies[enemiesNumber]);
          console.log("Intersect");
          break;
        }
      }
    }

    if (GAME_STATE.playerisDead) {
      this.player.destroyPlayer();
      GAME_STATE.gameOver = true;
    }

    if (GAME_STATE.gameOver) {
      this.gameOverProcedure();
    }

    this.player.updatePlayer(dt);
    this.player.laser.updateLasers(dt, $container);
    this.enemy.updateEnemies(dt, $container);
    this.enemy.enemyLaser.updateEnemyLasers(dt, $container);

    GAME_STATE.lastTime = currentTime;
    const gameOver = window.requestAnimationFrame(this.update);
    GAME_STATE.cancelAnimation = gameOver;

    if (GAME_STATE.enemies.length === 0 && GAME_STATE.lasers.length === 0) {
      $("header").html("Press Enter to play again");
      $("#victory").css("display", "flex");
      console.log("WIN");
      $container.innerHTML = "";
      window.cancelAnimationFrame(gameOver);
    }
  }
}
