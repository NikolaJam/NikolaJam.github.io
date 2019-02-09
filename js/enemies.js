import { EnemyLasers } from "/js/enemy-laser.js";
import { GameElement } from "/js/object.js";


export function Enemies() {

  this.createEnemies = function ($container, x, y) {
    this.x = x;
    this.y = y;
    this.$element = $("<img>").attr("src", ENEMIES.enemy).addClass("enemy").appendTo($container);

    this.setPosition(this.$element, this.x, this.y);
    this.enemy = {
      x: this.x,
      y: this.y,
      isAlive: this.isAlive,
      isDead: this.isDead,
      cooldown: rand(1, ENEMIES.cooldown),                  //random number of seconds for the cooldown
      $element: this.$element
    };
    GAME_STATE.enemies.push(this.enemy);
  }

  this.initialize = () => {
    var $game = $(".game")[0];
    const enemySpacing = (SCREEN.width - ENEMIES.horizontalPadding * 2) / (ENEMIES.perRow - 1); 
    for (let j = 0; j < ENEMIES.numberOfRows; j++) {
      const y = ENEMIES.verticalPadding + j * ENEMIES.verticalSpacing;
      for (let i = 0; i < ENEMIES.perRow; i++) {
        const x = i * enemySpacing + ENEMIES.horizontalPadding;
        this.createEnemies($game, x, y);
      }
    }
  }

  this.updateEnemies = (dt, $container) => {
    const enemies = GAME_STATE.enemies;

    for (var i = 0; i < enemies.length; i++) {
      const dx = Math.sin(GAME_STATE.lastTime / 500.0) * 50;                           //these two functions give us the 8 pattern
      const dy = Math.cos(GAME_STATE.lastTime / 1500.0) * 50;                         // movement of the enemies

      const enemy = enemies[i];
      const x = enemy.x + dx;
      const y = enemy.y + dy;
      this.setPosition(enemy.$element, x, y);

      this.enemyLaser = new EnemyLasers();
      enemy.cooldown -= dt;                                               //when the cooldown is over, a laser is created
      if (enemy.cooldown <= 0) {
        this.enemyLaser.createEnemyLaser($container, x, y);
        enemy.cooldown = rand(1, ENEMIES.cooldown);                     //random number of seconds for the cooldown again
      }                                                                 //if the first number is zero, enemies will shoot instantly
    }                                                                   //when the game starts
    GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);     //remove the destroyed enemies from the logic
  }
}
Enemies.prototype = new GameElement();