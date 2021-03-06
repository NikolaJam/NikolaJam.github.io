import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function Game() {
  var $container = $("#game");

  $(document).keypress((e) => {
    if (e.which == 50&&!GAME_STATE.player2Created) {
      this.player2 = new Player($container, PLAYER2);
      GAME_STATE.player2Created = true;
      $("header").html("Double Trouble");
      $("footer").html("| Player1: A-left / D-right,  spacebar - weapon | Player2: leftArrow / rightArrow, num0/ins - weapon |");
    }
  });

  this.initialize = () => {
    this.player = new Player($container, PLAYER);
    this.enemy = new Enemies();
    this.player.initialize();
    this.enemy.initialize();
  }

  this.roundEndProcedure = () => {
    ENEMIES.numberOfRows++;
    ENEMIES.cooldown += 3.0;
    PLAYER.cooldown -= 0.1;
    PLAYER.laser = `img/Lasers/laser${ENEMIES.numberOfRows}.png`;
    ENEMIES.enemy = `img/Enemies/enemy${ENEMIES.numberOfRows}.png`;
    ENEMIES.enemyLaser = `img/Lasers/enemyLaser${ENEMIES.numberOfRows}.png`;
    $("header").html(`Round ${ENEMIES.numberOfRows}`);

    this.enemy.initialize();
  }

  this.gameOverProcedure = () => {
    $container.empty();
    $(".touch").css("display", "none");
    $("header").html("Hint: avoid the lasers!");
    $("footer").html("Press the button to restart the game");
    this.$gameOver = $("<div>").addClass("game-over").attr("id", "game-over").css("display", "block").appendTo(".game-wrapper");

    $("<h1>").html(`You lost in round ${ENEMIES.numberOfRows}`).appendTo(this.$gameOver);
    $("<h2>").html("Game Over").addClass("title").attr("id", "lose").appendTo(this.$gameOver);
    $("<button>").html("Restart Game").addClass("btn").appendTo(this.$gameOver)
      .on("tap", function () {
        window.location.reload();
      }).on("click", function () {
        window.location.reload();
      });
    console.log("GAMEOVER");
    return;
  }

  this.update = () => {                                                 //this is the "game engine", based on requestAnimationFrame()
    const currentTime = Date.now();                                     //everything in this function is executed ~60 times per second
    const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;            //we use delta time (time passed since last calling the function)

    for (var laserNumber = 0; laserNumber < GAME_STATE.lasers.length; laserNumber++) {  // to move everything and decrease / increase values
      for (var enemiesNumber = 0; enemiesNumber < GAME_STATE.enemies.length; enemiesNumber++) {

        var $r1 = GAME_STATE.enemies[enemiesNumber].$element[0].getBoundingClientRect();
        var $r2 = GAME_STATE.lasers[laserNumber].$element[0].getBoundingClientRect();
        if (this.rectsIntersect($r1, $r2)) {

          this.player.laser.destroyElement(GAME_STATE.lasers[laserNumber]);
          this.enemy.destroyElement(GAME_STATE.enemies[enemiesNumber]);
          var explosion = new Audio("sound/lowDown.ogg");
          explosion.play();
          console.log("Enemy Destroyed");
          break;
        }
      }
    }

    this.player.updatePlayer(dt);

    if (GAME_STATE.player2Created === true) {
      this.player2.updatePlayer(dt);
    }

    this.player.laser.updateLasers(dt);
    this.enemy.updateEnemies(dt, $container);
    this.enemy.enemyLaser.updateEnemyLasers(dt, $container);

    if (GAME_STATE.playerisDead) {
      this.player.destroyElement();
      this.gameOverProcedure();
      return;
    }

    const gameOver = window.requestAnimationFrame(this.update);         // requestAnimationFrame is called inside update
    GAME_STATE.cancelAnimation = gameOver;                              //it executes update ~60 times per second

    if (GAME_STATE.enemies.length === 0) {
      if (ENEMIES.numberOfRows === 5) {
        $(".touch").css("display", "none");
        $("header").html(`Congratulations, you saved the Earth`);
        $("#victory").css("display", "flex");
        console.log("WIN");
        GAME_STATE.victory = true;
        $container.html("");
        window.cancelAnimationFrame(gameOver);
        return;
      }
      this.roundEndProcedure();
    }
    GAME_STATE.lastTime = currentTime;
  }
}

Game.prototype.rectsIntersect = rectsIntersect;
