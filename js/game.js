function Game() {

  const $container = document.querySelector(".game");
  this.player = new Player($container);
  this.enemy = new Enemies();
  this.initialize = function () {
    this.player.initialize();
    this.enemy.initialize();
  }

  this.update =  () => {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
    this.player.updatePlayer(dt);
      this.enemy.updateEnemies(dt, $container);
    GAME_STATE.lastTime = currentTime;
    window.requestAnimationFrame(this.update);
  }

}
game = new Game();
game.initialize();
game.update();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(game.update);











// if (GAME_STATE.gameOver) {
//   document.querySelector(".game-over").style.display = "block";
//   return;
// }

// function playerHasWon() {
//   return GAME_STATE.enemies.length === 0;
// }
// if (playerHasWon()) {
//   document.querySelector(".congratulations").style.display = "block";
//   return;
// }
