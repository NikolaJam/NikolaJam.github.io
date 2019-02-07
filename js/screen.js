import { Game } from "/js/game.js";

function screen() {
    var game = new Game();
    setTimeout(game.initialize, 300);
    setTimeout(game.update, 310);
    var audio = new Audio("sound/Mighty_Eight_Bit_Ranger.mp3");
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
        $("header").html("Have Fun!");
        $("#victory").css("display", "none");
        $game.empty();
        screen();
        return;
    }
});



