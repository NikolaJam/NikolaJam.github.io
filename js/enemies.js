function Enemies() {

  this.setPosition = ($element, x, y) => {
    $element.style.transform = `translate(${x}px, ${y}px)`;                     // Template literals
  }

  this.createEnemies = function ($container, x, y) {
    this.x = x;
    this.y = y;

    $("<img>").attr("src", "img/enemy-green-3.png")               //creates the DOM part of enemy
      .attr("ID", "enemy").addClass("enemy").appendTo($container)
      .css({ "transform": `translate(${this.x}px, ${this.y}px)` });

    this.varEnemy = {                                          //creates the logic part of enemy
      x,
      y,
      cooldown: rand(0.5, ENEMY_COOLDOWN),
      $element: document.querySelector(".enemy")
    };

    GAME_STATE.enemies.push(this.varEnemy);                   //push enemy in array of enemies
  }

  this.initialize = function () {
    var $enemies = $(".game")[0];
    const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
      for (let i = 0; i < ENEMIES_PER_ROW; i++) {
        const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
        this.createEnemies($enemies, x, y);

      }
    }
  }

  this.updateEnemies = (dt, $container) => {
    const enemies = GAME_STATE.enemies;

    for (var i = 0; i < enemies.length; i++) {
      const dx = Math.sin(GAME_STATE.lastTime / 500.0) * 50;
      const dy = Math.cos(GAME_STATE.lastTime / 1500.0) * 50;

      const enemy = enemies[i];
      const x = enemy.x + dx;
      const y = enemy.y + dy;
      var $en = $(".enemy")[i];

      this.setPosition($en, x, y);

    }

  }

}
