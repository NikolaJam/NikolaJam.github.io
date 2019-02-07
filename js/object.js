export function GameElement() {
    this.x;
    this.y;
    this.setPosition = ($container, x, y) => {
        $container.css({ "transform": `translate(${x}px, ${y}px)` });
    }
    this.destroyElement = function (element) {
        if (element) {
            element.$element.remove();
        }
        else {
            this.remove();
        }
        element.isDead = true;
    }
}