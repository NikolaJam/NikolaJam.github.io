import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function Game() {
  var $container = $("#game");

  this.initialize = () => {
    this.player = new Player($container);
    this.enemy = new Enemies();
    this.player.initialize();
    this.enemy.initialize();
  }

  this.gameOverProcedure = () => {
    $container.empty();
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


    for (var laserNumber = 0; laserNumber < GAME_STATE.lasers.length; laserNumber++) {              
    
      for (var enemiesNumber = 0; enemiesNumber < GAME_STATE.enemies.length; enemiesNumber++) {
              
        var $r1 = GAME_STATE.enemies[enemiesNumber].$element[0].getBoundingClientRect();                  
        var $r2 = GAME_STATE.lasers[laserNumber].$element[0].getBoundingClientRect();
        if (this.rectsIntersect($r1, $r2)) {

          this.player.laser.destroyElement(GAME_STATE.lasers[laserNumber]);
          this.enemy.destroyElement(GAME_STATE.enemies[enemiesNumber]);
          var explosion  = new Audio("sound/space-explosion.wav");
          explosion.play();
          console.log("Intersect");
          break;
        }
      }
    }

    this.player.updatePlayer(dt);
    this.player.laser.updateLasers(dt);
    this.enemy.updateEnemies(dt, $container);
    this.enemy.enemyLaser.updateEnemyLasers(dt, $container);

    if (GAME_STATE.playerisDead) {
      this.player.destroyElement();
      var explosionPlayer  = new Audio("sound/player-explod.wav");
      explosionPlayer.play();
      this.gameOverProcedure();
      return;
    }

    GAME_STATE.lastTime = currentTime;
    const gameOver = window.requestAnimationFrame(this.update);
    GAME_STATE.cancelAnimation = gameOver;

    if (GAME_STATE.enemies.length === 0 && GAME_STATE.lasers.length === 0) {
      $("header").html("Press Enter to play again");
      $("#victory").css("display", "flex");
      console.log("WIN");
      GAME_STATE.victory = true;
      window.cancelAnimationFrame(gameOver);
    }
  }
}

Game.prototype.rectsIntersect = rectsIntersect;