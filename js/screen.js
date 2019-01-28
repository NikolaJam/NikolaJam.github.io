import { Game } from "/js/game.js";

function screen() {

    var game = new Game();
    game.initialize();
    game.update();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    
}

screen();