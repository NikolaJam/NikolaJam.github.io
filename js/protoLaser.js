import { GameElement } from "/js/object.js";
export function createLaser($container, srcd, sound, type, x, y){
    this.x = x;
    this.y = y;
    this.setPosition = ($c, x, y) => {
        $c.css({ "transform": `translate(${x}px, ${y}px)` });
    }
    var name = type;
    this.$element = $("<img>").attr({src: srcd}).addClass(name).appendTo($container);
    // this.setPosition(this.$element, this.x, this.y);
    this.laser = {
        isDead: false,
        x: this.x,
        y: this.y,
        $element: this.$element
    };
    var audio = new Audio(`${sound}`);
    audio.play();
    if (type === "laser") {
        GAME_STATE.lasers.push(this.laser);
    }
    else if (type === "enemyLaser") {
        GAME_STATE.enemyLasers.push(this.laser);
    }
}
// createLaser.prototype = new GameElement();
// var $container = $(".game");
//   this.createLaser ($container, "img/laser-red-12.png", "sound/Laser_Shoot16.ogg", "laser", GAME_STATE.playerX, GAME_STATE.playerY); 