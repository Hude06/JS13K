import { Enemy } from "../Characters/enemy.js";
import { globals } from "../main.js";
import { Point, Rect } from "./JudeUtils.js";
import { UtilityAI } from "./utilityAI.js";
function spawnEnemy(player,e) {
    let newE = e.toLowerCase();
    if (newE == "chicken" || newE == "duck") {
        globals.enemys.push(new Enemy(player,"../Assets/Duck.png"))
    }
    if (newE == "baby chicken" || newE == "baby duck") {
        globals.enemys.push(new Enemy(player,"../Assets/BabyDuck.png"))
    }

}
export class Boss {
    constructor(health, player, actions) {
        this.bounds = new Rect(200, 150, 100, 100);
        this.speed = 1.25;
        this.actions = actions;
        this.Velocity = new Point(0, 0);
        this.gravity = 0.2;
        this.image = new Image();
        this.image.src = "../Assets/BabyDuck.png";
        this.factors = {
            health: health,
            characterPosition: this.bounds,
            playerPosition: player.bounds,
            position: '', // Will be set in the update method
            gameState: '' // Will be set in the update method
        };
        this.ableToAttack = true;
        this.ai = new UtilityAI(this.actions);
        this.player = player;
        this.alive = true;
        this.isGrounded = false; // Initialize isGrounded
        this.currentAction = null;
    }

    draw() {
        if (this.alive) {
            globals.ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        }
    }

    update(level) {
        if (this.factors.health <= 0) {
            this.alive = false;
            return;
        }

        if (this.alive) {
            this.bounds.x += this.Velocity.x;
            if (this.Velocity.x > this.speed) {
                this.Velocity.x = this.speed-0.1;
            }
            if (this.Velocity.x < -this.speed) {
                this.Velocity.x = -this.speed+0.1;
            }
            const tileX = Math.floor((this.bounds.x + this.bounds.w / 2) / globals.BLOCKSIZE);
            const tileY = Math.floor((this.bounds.y) / globals.BLOCKSIZE);
            const tileIndex = new Point(tileX, tileY);

            const right_tile1 = level.get(tileIndex.add(1, 0));
            const right_tile2 = level.get(tileIndex.add(1, 1));
            const left_tile1 = level.get(tileIndex.add(0, 0));
            const left_tile2 = level.get(tileIndex.add(0, 1));

            let bottomTiles = [];
            const numRows = Math.floor(this.bounds.h / (globals.BLOCKSIZE-5));
            const numCols = Math.floor(this.bounds.w / (globals.BLOCKSIZE-5));
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    bottomTiles.push(level.get(tileIndex.add(j - 1, i+1)));
                }
            }
            for (let i = 0; i < bottomTiles.length; i++) {
                globals.debugBlocks.push(bottomTiles[i]);
            }   
            // HORIZONTAL ALIGNMENT
            this.isGrounded = false; // Reset isGrounded at the start of update

            if (right_tile1 && right_tile1.WHATBlockAmI === 1 && right_tile2 && right_tile2.WHATBlockAmI === 1) {
                this.bounds.x = (tileIndex.x-2) * globals.BLOCKSIZE;
                this.Velocity.x = 0;
            } else if (left_tile1 && left_tile1.WHATBlockAmI === 1 && left_tile2 && left_tile2.WHATBlockAmI === 1) {
                this.bounds.x = (tileIndex.x + 1) * globals.BLOCKSIZE;
                this.Velocity.x = 0;
            } else {
                // Check if boss is grounded
                for (let tile of bottomTiles) {
                    if (tile.WHATBlockAmI !== 0) {
                        this.isGrounded = true;
                    }
                }
            }
            if (this.currentAction) {
                this.currentAction();
            }
            // VERTICAL ALIGNMENT
            if (this.isGrounded) {
                this.bounds.y = Math.floor(this.bounds.y / globals.BLOCKSIZE) * globals.BLOCKSIZE;
                this.Velocity.y = 0;
                this.ableToJump = true;
            } else {
                this.applyGravity();
            }

            this.factors.characterPosition = this.bounds;
            this.factors.playerPosition = this.player.bounds;

            let action = this.ai.update(this.factors);
            if (action === "attack") {
                this.currentAction = this.attack
            } else if (action === "defend") {
                this.currentAction = this.defend;
            } else if (action === "run") {
                this.currentAction = this.runAway;
            } else if (action === "idle") {
                this.currentAction = this.idle;
            }

            this.collision();
        }
    }

    hit(n) {
        this.factors.health -= n;
    }

    collision() {
        for (let bullet of globals.bullets) {
            let bulletRect = new Rect(bullet.x, bullet.y, bullet.w, bullet.h);
            if (this.bounds.intersects(bulletRect)) {
                this.hit(this.player.gun.damage);
                // Optionally, you can remove or deactivate the bullet here
                // globals.bullets.splice(globals.bullets.indexOf(bullet), 1);
            }
        }
    }

    applyGravity() {
        this.Velocity.y += this.gravity;
        this.bounds.y += this.Velocity.y;

    }

    attack() {
        if (this.ableToAttack) {
            spawnEnemy(this.player, "baby duck");
            this.ableToAttack = false
            setTimeout(() => {
                this.ableToAttack = true;
            },2000);
        }

        
        if (this.player.bounds.x > this.bounds.x) {
            this.Velocity.x += this.speed;
        }
        else {
            this.Velocity.x -= this.speed;
        }
    }

    defend() {
        console.log("Defend");
    }

    runAway() {
        console.log("Run away");
        if (this.bounds.x > this.player.bounds.x) {
            this.Velocity.x += this.speed;
        } else {
            this.Velocity.x -= this.speed;
        }
    }

    idle() {
        console.log("Do nothing");
    }
}
