// import { Enemies } from "/js/enemies.js";
// import {Laser} from "/js/laser.js";
// import {Player} from "/js/player.js";


function randomNum(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rectsIntersect(r1, r2) {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}


function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function onKeyDown(e) {
  if (e.keyCode === KEY.left) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY.right) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY.space) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY.left) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY.right) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY.space) {
    GAME_STATE.spacePressed = false;
  }
}
