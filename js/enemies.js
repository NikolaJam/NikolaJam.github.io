import { Player } from "/js/player.js";
import { Laser } from "/js/laser.js";
import { EnemyLasers } from "/js/enemy-laser.js";

export function Enemies() {
  this.x;
  this.y;
  this.$element;

  this.isDead = false;
  this.setPosition = ($element, x, y) => {
    $element.style.transform = `translate(${x}px, ${y}px)`;                     // Template literals
  }

  this.createEnemies = function ($container, x, y) {
    this.x = x;
    this.y = y;
    this.$element = document.createElement("img");
    this.$element.src = "img/enemy-green-3.png";
    this.$element.className = "enemy";
    $container.appendChild(this.$element);

    this.setPosition(this.$element, this.x, this.y);
    this.varEnemy = {                                          //creates the logic part of enemy
      x: this.x,                                                // mozebi ne e dobro vaka proveri!!!
      y: this.y,
      cooldown: rand(0.5, ENEMY_COOLDOWN),
      $element: this.$element
    };

    GAME_STATE.enemies.push(this.varEnemy);                   //push enemy in array of enemies
  }

  this.initialize = function () {
    var $game = $(".game")[0];
    const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
      for (let i = 0; i < ENEMIES_PER_ROW; i++) {
        const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
        this.createEnemies($game, x, y);
      }
    }
  }

  this.updateEnemies = (dt, $container) => {

    const enemies = GAME_STATE.enemies;

    for (var i = 0; i < enemies.length; i++) {
      const dx = Math.sin(GAME_STATE.lastTime / 500.0) * 50;
      const dy = Math.cos(GAME_STATE.lastTime / 1500.0) * 50;
      const enemy = enemies[i];

      var enemyRect;                                                                    //for hit-testing
      const x = enemy.x + dx;
      const y = enemy.y + dy;

      var $en = $(".enemy")[i];
      this.setPosition($en, x, y);

      enemyRect = $en.getBoundingClientRect();
      GAME_STATE.enemyDomRect.push(enemyRect);
      enemy.cooldown -= dt;

      var enemyLaser = new EnemyLasers(x, y);
      if (enemy.cooldown <= 0) {
        enemyLaser.createEnemyLaser($container, x, y);
        enemy.cooldown = ENEMY_COOLDOWN;
      }
      enemyLaser.updateEnemyLasers(dt, $container);
    }
    GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
  }

  this.destroyEnemy = ($container, enemy) => {
    $container.removeChild(enemy.$element);
    enemy.isDead = true;
  }
}
