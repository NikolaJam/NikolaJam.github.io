import { Player } from "/js/player.js";
import { Laser } from "/js/laser.js";
import { EnemyLasers } from "/js/enemy-laser.js";
 
export function Enemies() {
  this.isDead = false;
  this.x;
  this.y;
  this.$element;
  this.isAlive = true;
  this.setPosition = ($element, x, y) => {
    $element.style.transform = `translate(${x}px, ${y}px)`;
  }
   

  this.createEnemies = function ($container, x, y) {
    this.x = x;
    this.y = y;
    this.$element = document.createElement("img");
    this.$element.src = "img/alien-green.png";
    this.$element.className = "enemy";
    $container.appendChild(this.$element);

     
    this.setPosition(this.$element, this.x, this.y);
    this.enemy = {                                           
      x: this.x,                                                 
      y: this.y,
      isAlive: this.isAlive,
      isDead: this.isDead,
      cooldown: rand(1, ENEMIES.cooldown),                  //random number between 1 - 10;
      $element: this.$element
    };

    GAME_STATE.enemies.push(this.enemy);                    

  }
  this.initialize = function () {

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
      const dx = Math.sin(GAME_STATE.lastTime / 500.0) * 50;
      const dy = Math.cos(GAME_STATE.lastTime / 1500.0) * 50;

      const enemy = enemies[i];
      const x = enemy.x + dx;
      const y = enemy.y + dy;

      var $gm = document.querySelector(".game");
      if (!enemy.isAlive) {

        $gm.removeChild(enemy.$element);
      }
      this.setPosition(enemy.$element, x, y);

      enemy.cooldown -= dt;

      this.enemyLaser = new EnemyLasers(x, y);
      
      if (enemy.cooldown <= 0) {
        this.enemyLaser.createEnemyLaser($container, x, y);
        enemy.cooldown = ENEMIES.cooldown;
      }
      
    }
    GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
  }

  this.destroyEnemy = ($container, enemy) => {
     
    enemy.$element.style.display = "none";
    enemy.isAlive = false;
    enemy.isDead = true;
  }
}

 