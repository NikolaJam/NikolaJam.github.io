export function GameElement() {
   
    this.setPosition = ($container, x, y) => {
        $container.css({ "transform": `translate(${x}px, ${y}px)` });
    }
    this.destroyElement = function (element) {
        if (element) {
            element.$element.remove();
             element.isDead = true;
        }
        else {
            console.log("Player Destroyed");
            var player=$(".player");
            player.remove();
        }
       
    }
}