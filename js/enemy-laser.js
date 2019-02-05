import { Player } from "/js/player.js";
import { Enemies } from "/js/enemies.js";

export function EnemyLasers(x, y) {
    this.x = x;
    this.y = y;

    this.setPosition = ($element, x, y) => {
        $element.style.transform = `translate(${x}px, ${y}px)`;
    }

    this.rectsIntersect = ($r1, $r2) => {
        return !($r2.left > $r1.right || $r2.right < $r1.left || $r2.top > $r1.bottom || $r2.bottom < $r1.top);
    }

    this.createEnemyLaser = ($container, x, y) => {
        var audio = new Audio("sound/Laser_Shoot16.ogg");
        audio.play();
        this.$element = document.createElement("img");
        this.$element.src = "img/laser-green-5.png";
        this.$element.className = "enemy-laser";
        $container.appendChild(this.$element);

        this.laser = {
            x: this.x,
            y: this.y,
            $element: this.$element
        };
        GAME_STATE.enemyLasers.push(this.laser);
        this.setPosition(this.$element, this.x, this.y);
    }
    this.updateEnemyLasers = (dt, $container) => {
        this.lasers = GAME_STATE.enemyLasers;

        for (let i = 0; i < this.lasers.length; i++) {
            const laser = this.lasers[i];
            laser.y += dt * GAME_STATE.laserSpeed;
            if (laser.y > SCREEN.height - 30) {
                this.destroyLaser($container, laser);
            }
            if (!GAME_STATE.playerisDead) {
                const r1 = laser.$element.getBoundingClientRect();
                const player = document.querySelector(".player");
                const r2 = player.getBoundingClientRect();
                
                if (rectsIntersect(r1, r2)) {
                    GAME_STATE.playerisDead = true;
                    console.log("Intersect");
                    break;
                }
            }
            this.setPosition(laser.$element, laser.x, laser.y);

        }
        GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
    }
    this.destroyLaser = function ($container, laser) {
        $container.removeChild(laser.$element);
        laser.isDead = true;
    }
}