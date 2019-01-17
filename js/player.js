 function Player($container) {

  this.x = GAME_WIDTH / 2;
  this.y = GAME_HEIGHT - 50;
  this.playerWidth = 20;          
 

 $("<img>").attr("src", "img/player-blue-1.png")
    .attr("ID", "player").addClass("player")
    .appendTo($container);
  this.$avatar = $(".player")[0];

  this.initialize = function () {
    this.$avatar.style.transform = `translate(${this.x}px, ${this.y}px)`;                     // Template literals
  }

  this.updatePlayer = function (dt) {
 
    if (GAME_STATE.leftPressed) {
      this.x -= 4;                  
      dt * this.playerSpeed;
     
    }
    if (GAME_STATE.rightPressed) {
      this.x += 4;
    }
  
    this.x = constrain(this.x, this.playerWidth, GAME_WIDTH - this.playerWidth);
  
    if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
      console.log("space");
    }
    if (GAME_STATE.playerCooldown > 0) {
      GAME_STATE.playerCooldown -= dt;
    }
    
    this.initialize();
    const $player = document.querySelector(".player");  
  }
}

 



























  // export function createPlayer($container) {
//     GAME_STATE.playerX = GAME_WIDTH / 2;
//     GAME_STATE.playerY = GAME_HEIGHT - 50;
//     const $player = document.createElement("img");
//     $player.src = "img/player-blue-1.png";
//     $player.className = "player";
//     $container.appendChild($player);
//     setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
//   }
// export function updatePlayer(dt, $container) {
//   if (GAME_STATE.leftPressed) {
//     GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
//   }
//   if (GAME_STATE.rightPressed) {
//     GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
//   }

//   GAME_STATE.playerX = clamp(
//     GAME_STATE.playerX,
//     PLAYER_WIDTH,
//     GAME_WIDTH - PLAYER_WIDTH
//   );

//   if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
//     createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
//     GAME_STATE.playerCooldown = LASER_COOLDOWN;
//   }
//   if (GAME_STATE.playerCooldown > 0) {
//     GAME_STATE.playerCooldown -= dt;
//   }

//   const player = document.querySelector(".player");
//   setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
// }
// export function destroyPlayer($container, player) {
//   $container.removeChild(player);
//   GAME_STATE.gameOver = true;
//   const audio = new Audio("sound/sfx-lose.ogg");
//   audio.play();
// }