import { Game } from "/js/game.js";
 
function screen() {
    var game = new Game();
    setTimeout(game.initialize, 300);                               //so you don't get killed while the game is loading
    setTimeout(game.update, 310);
    var audio = new Audio("sound/Mighty_Eight_Bit_Ranger1.mp3");
    audio.play();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

const $game = $(".game");


$(document).keypress((e) => {
    if (e.which == 13) {
        if (GAME_STATE.playerisDead || GAME_STATE.enemies.length > 0 || GAME_STATE.victory) {
            window.location.reload();
        }

        $("header").html("Press 2 for Player 2");
        $("#victory").css("display", "none");
        $game.empty();
        screen();
        return;
    }
});

function handleEnterTouch() { 
    $(".touch").css("display","flex");
    if (GAME_STATE.playerisDead || GAME_STATE.enemies.length > 0 || GAME_STATE.victory) {
        window.location.reload();
    }
    $("header").html("Have Fun!");
    $("#victory").css("display", "none");
    $game.empty();
    screen();
    GAME_STATE.spacePressed=true;
}

function handleStartLeft() {
    GAME_STATE.leftPressed = true;
}

function handleEndLeft() {
    GAME_STATE.leftPressed = false;
}

function handleStartRight() {
    GAME_STATE.rightPressed = true;
}

function handleEndRight() {
    GAME_STATE.rightPressed = false;
}

function touchControls() {
    var $leftTouch = $(".left")[0];
    $leftTouch.addEventListener("touchstart", handleStartLeft, false);
    $leftTouch.addEventListener("touchend", handleEndLeft, false);

    var $rightTouch = $(".right")[0];
    $rightTouch.addEventListener("touchstart", handleStartRight, false);
    $rightTouch.addEventListener("touchend", handleEndRight, false);
    
    var $enterTouch = $(".game")[0];
    $enterTouch.addEventListener("touchstart", handleEnterTouch, false);

    console.log("Touch controls active!");
}
touchControls();
