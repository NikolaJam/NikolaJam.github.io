 
function randomNum(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rectsIntersect(r1, r2) {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}

constrain = (x, min, max) => {                      //constrains a target X between min and max, in our case the ship in the screen
  if (x < min) {
    return min;
  } else if (x > max) {
    return max;
  } else {
    return x;
  }
}

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function onKeyDown(e) {
  if (e.keyCode === KEY.left) {
    PLAYER.leftPressed = true;
  }
  if (e.keyCode === KEY.left2) {
    PLAYER2.leftPressed = true;
  }
  else if (e.keyCode === KEY.shift) {
    PLAYER.shiftPressed = true;
  }
  else if (e.keyCode === KEY.right) {
    PLAYER.rightPressed = true;
  }else if (e.keyCode === KEY.right2) {
    PLAYER2.rightPressed = true;
  }
  else if (e.keyCode === KEY.space) {
    PLAYER.spacePressed = true;
  }
  else if (e.keyCode === KEY.num0 || e.keyCode ===KEY.insert) {
    PLAYER2.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY.left) {
    PLAYER.leftPressed = false;
  }
  if (e.keyCode === KEY.left2) {
    PLAYER2.leftPressed = false;
  }
  else if (e.keyCode === KEY.shift) {
    PLAYER.shiftPressed = false;
  }
  else if (e.keyCode === KEY.right) {
    PLAYER.rightPressed = false;
  } 
  else if (e.keyCode === KEY.right2) {
    PLAYER2.rightPressed = false;
  } 
  else if (e.keyCode === KEY.space) {
    PLAYER.spacePressed = false;
  }
  else if (e.keyCode === KEY.num0 || e.keyCode ===KEY.insert) {
    PLAYER2.spacePressed = false;
  }
}


