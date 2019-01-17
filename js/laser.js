  function Laser($container){
  
}

































// export function createLaser($container, x, y) {
  //     const $element = document.createElement("img");
  //     $element.src = "img/laser-blue-1.png";
  //     $element.className = "laser";
  //     $container.appendChild($element);
  //     const laser = { x, y, $element };
  //     GAME_STATE.lasers.push(laser);
  //     const audio = new Audio("sound/sfx-laser1.ogg");
  //     audio.play();
  //     setPosition($element, x, y);
  //   }
    
  //   export function updateLasers(dt, $container) {
  //     const lasers = GAME_STATE.lasers;
  //     for (let i = 0; i < lasers.length; i++) {
  //       const laser = lasers[i];
  //       laser.y -= dt * LASER_MAX_SPEED;
  //       if (laser.y < 0) {
  //         destroyLaser($container, laser);
  //       }
  //       setPosition(laser.$element, laser.x, laser.y);
  //       const r1 = laser.$element.getBoundingClientRect();
  //       const enemies = GAME_STATE.enemies;
  //       for (let j = 0; j < enemies.length; j++) {
  //         const enemy = enemies[j];
  //         if (enemy.isDead) continue;
  //         const r2 = enemy.$element.getBoundingClientRect();
  //         if (rectsIntersect(r1, r2)) {
  //           // Enemy was hit
  //           destroyEnemy($container, enemy);
  //           destroyLaser($container, laser);
  //           break;
  //         }
  //       }
  //     }
  //     GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
  //   }
    
  //   export function destroyLaser($container, laser) {
  //     $container.removeChild(laser.$element);
  //     laser.isDead = true;
  //   }