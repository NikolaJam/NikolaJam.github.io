import { Game } from "/js/game.js";

function screen() {
    var game = new Game();
    setTimeout(game.initialize, 300);
    setTimeout(game.update,310);
  
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

var $game = document.querySelector("#game");

$(document).keypress((e) => {

    if (e.which == 13) {
        $("header").html("Have Fun!");
        $("#victory").css("display","none");
        $game.innerHTML="";
        screen();
    }
});

 

