import { Enemy } from "../Characters/enemy.js";
import { globals } from "../main.js";
import { Point, Rect } from "./JudeUtils.js";
import { UtilityAI } from "./utilityAI.js";
function spawnEnemy(player,e) {
    let newE = e.toLowerCase();
    if (newE == "chicken" || newE == "duck") {
        globals.enemys.push(new Enemy(player,"./Duck.png"))
        globals.mobsLeft += 1
    }
    if (newE == "baby chicken" || newE == "baby duck") {
        globals.enemys.push(new Enemy(player,"./BabyDuck.png"))
        globals.mobsLeft += 1
    }

}
export class Boss {
    constructor(health, player, actions) {
        this.bounds = new Rect(0, 150, 100, 100);
        this.speed = 1;
        this.actions = actions;
        this.Velocity = new Point(0, 0);
        this.gravity = 0.2;
        this.image = new Image();
        this.image.src = "./BabyDuck.png";
        this.factors = {
            health: health,
            characterPosition: this.bounds,
            playerPosition: player.bounds,
            position: '', // Will be set in the update method
            gameState: '' // Will be set in the update method
        };
        this.ableToAttack = false;
        setTimeout(() => {this.ableToAttack = true},3000)
        this.ai = new UtilityAI(this.actions);
        this.player = player;
        this.alive = true;
        this.isGrounded = false; // Initialize isGrounded
        this.currentAction = null;
    }
    knockBack() {
        if (this.Velocity.x > 0) {
            this.bounds.x -= this.speed*50
        } else {
            this.bounds.x += this.speed*50
        }
    }
    draw() {
        if (this.alive) {
            globals.ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        }
    }

    update(level) {
        const BASE_COOLDOWN = 10000; // 10 seconds in milliseconds
        const MIN_COOLDOWN = 1000; // 1 second in milliseconds
        
        if (this.ableToAttack) {
            spawnEnemy(this.player, "baby duck");
            this.ableToAttack = false;
        
            // Calculate cooldown based on playtime
            // globals.timePlayed is updated every frame, so this will be a continuous decrease
            let cooldownPeriod = BASE_COOLDOWN - (globals.timePlayed * 100); // Adjust multiplier as needed
        
            // Ensure cooldown doesn't drop below minimum value
            cooldownPeriod = Math.max(cooldownPeriod, MIN_COOLDOWN);
        
            // Set the timeout for the attack cooldown
            setTimeout(() => {
                this.ableToAttack = true;
            }, cooldownPeriod);
        }

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
        this.knockBack();
        globals.mobsLeft -= 1;
    }

    collision() {
        for (let i = 0; i < globals.bullets.length; i++) {
            let bulletRect = new Rect(globals.bullets[i].x, globals.bullets[i].y, globals.bullets[i].w, globals.bullets[i].h);
            if (this.bounds.intersects(bulletRect) || bulletRect.intersects(this.bounds)) {
                this.hit(this.player.gun.damage);
                globals.bullets.splice(i, 1);
            }
        }
    }

    applyGravity() {
        this.Velocity.y += this.gravity;
        this.bounds.y += this.Velocity.y;

    }

    attack() {
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
