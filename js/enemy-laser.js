import { GameElement } from "/js/object.js";
export function EnemyLasers() {

	this.createEnemyLaser = ($container, x, y) => {
		this.x = x;
		this.y = y;
		this.$element = $("<img>").attr("src", ENEMIES.enemyLaser).addClass("enemy-laser").appendTo($container);

		this.laser = {
			x: this.x,
			y: this.y,
			$element: this.$element
		};
		var audio = new Audio("sound/laser9.ogg");
		audio.play();
		GAME_STATE.enemyLasers.push(this.laser);
	}

	this.updateEnemyLasers = (dt) => {
		this.lasers = GAME_STATE.enemyLasers;

		for (let i = 0; i < this.lasers.length; i++) {
			const laser = this.lasers[i];
			laser.y += dt * GAME_STATE.laserSpeed;

			if (!GAME_STATE.playerisDead) {

				const r1 = laser.$element[0].getBoundingClientRect();
				const player1 = $(".player").first();
				const r2 = player1[0].getBoundingClientRect();
				if (this.rectsIntersect(r1, r2)) {
					GAME_STATE.playerisDead = true;
					this.destroyElement(laser);
					break;
				}
				if (GAME_STATE.player2Created) {
					const player2 = $(".player").last();
					const r3 = player2[0].getBoundingClientRect();
					if (this.rectsIntersect(r1, r3)) {
						GAME_STATE.playerisDead = true;
						this.destroyElement(laser);
						break;
					}
				}
			}
			if (laser.y > SCREEN.height) {
				this.destroyElement(laser);
			}
			this.setPosition(laser.$element, laser.x, laser.y);
		}
		GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
	}
}
EnemyLasers.prototype = new GameElement();
EnemyLasers.prototype.rectsIntersect = rectsIntersect;