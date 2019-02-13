import { GameElement } from "/js/object.js";
export function PowerUp() {

    this.createPowerUp = ($container, x, y) => {
        this.x = x;
        this.y = y;
        this.$element = $("<img>").attr("src", POWER_SPEED.src).addClass("power-up").appendTo($container);

        this.powerUp = {
            x: this.x,
            y: this.y,
            $element: this.$element
        };

        GAME_STATE.powerUps.push(this.powerUp);
    }

    this.updatePowerUp = (dt) => {
        this.powerUps = GAME_STATE.powerUps;

        for (let i = 0; i < this.powerUps.length; i++) {
            const powerUp = this.powerUps[i];
            powerUp.y += dt * POWER_SPEED.speed;

            if (!GAME_STATE.playerisDead) {

                const r1 = powerUp.$element[0].getBoundingClientRect();
                const player = document.querySelector(".player");
                const r2 = player.getBoundingClientRect();

                if (this.rectsIntersect(r1, r2)) {
                    PLAYER.cooldown -= POWER_SPEED.value;
                    this.destroyElement(powerUp);
                    console.log("Intersect");
                    break;
                }
            }
           
            if (powerUp.y > SCREEN.height) {
                this.destroyElement(powerUp);
            }
            this.setPosition(powerUp.$element, powerUp.x, powerUp.y);
        }
        GAME_STATE.powerUps = GAME_STATE.powerUps.filter(e => !e.isDead);
    }
}
PowerUp.prototype = new GameElement();
PowerUp.prototype.rectsIntersect = rectsIntersect;


// import { GameElement } from "/js/object.js";
// export function PowerUp() {

//     this.createPowerUp = ($container, x, y) => {
//         this.x = x;
//         this.y = y;
//         this.$element = $("<img>").attr("src", POWER_SPEED.src).addClass("power-up").appendTo($container);

//         this.powerUp = {
//             x: this.x,
//             y: this.y,
//             $element: this.$element
//         };

//         GAME_STATE.powerUps.push(this.powerUp);
//     }

//     this.updatePowerUp = (dt) => {
//         this.powerUps = GAME_STATE.powerUps;

//         for (let i = 0; i < this.powerUps.length; i++) {
//             const powerUp = this.powerUps[i];
//             powerUp.y += dt * POWER_SPEED.speed;

//             if (!GAME_STATE.playerisDead) {

//                 const r1 = powerUp.$element[0].getBoundingClientRect();
//                 const player = document.querySelector(".player");
//                 const r2 = player.getBoundingClientRect();

//                 if (this.rectsIntersect(r1, r2)) {
//                     PLAYER.defaultCooldown -= POWER_SPEED.value;
//                     this.destroyElement(powerUp);
//                     console.log("Intersect");
//                     break;
//                 }
//             }
//             if (powerUp.y > SCREEN.height) {
//                 this.destroyElement(powerUp);
//             }
//             this.setPosition(powerUp.$element, powerUp.x, powerUp.y);
//         }
//         GAME_STATE.powerUps = GAME_STATE.powerUps.filter(e => !e.isDead);
//     }
// }
// PowerUp.prototype = new GameElement();
// PowerUp.prototype.rectsIntersect = rectsIntersect;