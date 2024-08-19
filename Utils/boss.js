import { globals } from "../main.js";
import { Point, Rect } from "./JudeUtils.js";
import { UtilityAI } from "./utilityAI.js";
export class Boss {
    constructor(health,player,actions) {
        this.bounds = new Rect(200, 150, 30, 30);
        this.speed = player.speed;
        this.actions = actions 
        this.Velocity = new Point(0,0);
        this.gravity = 0.2
        this.image = new Image()
        this.image.src = "../Assets/Trash Man.png"
        this.factors = {
            health: health, // Example health value (critically low)
            characterPosition: this.bounds,
            playerPosition: player.bounds,
            position: '', // Will be set in the update method
            gameState: '' // Will be set in the update method
        };
        this.ai = new UtilityAI(this.actions);
        this.player = player;
        this.alive = true;
    }
    draw() {
        if (this.alive) {
            globals.ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
    }
    update(level) {
        if (this.factors.health <= 0) {
            this.alive = false;
        }
        if (this.alive) {
            const tileX = Math.floor(this.bounds.x / globals.BLOCKSIZE);
            const tileY = Math.floor(this.bounds.y / globals.BLOCKSIZE);
            const tileIndex = new Point(tileX, tileY);
            const tileContents = level.get(tileIndex)
            const right_tile1 = level.get(tileIndex.add(1, 0));
            const right_tile2 = level.get(tileIndex.add(1, 1));
            const left_tile1 = level.get(tileIndex.add(0, 0));
            const left_tile2 = level.get(tileIndex.add(0, 1));
            let bottom1 = level.get(tileIndex.add(0, 1));
            const bottom2 = level.get(tileIndex.add(1, 1));
            //HORIZONTAL ALIGNMENT
            if (right_tile1) {
                if(right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
                    this.bounds.x = tileIndex.x * globals.BLOCKSIZE;
                    this.Xvelocity = 0
                    this.isGrounded = bottom1.WHATBlockAmI == 1;
                } else if(left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
                    this.bounds.x = ((tileIndex.x+1)*globals.BLOCKSIZE)
                    this.Xvelocity = 0
                    this.isGrounded = bottom2.WHATBlockAmI == 1;
                } else {
                    this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
                }
                if (this.isGrounded) {
                    this.grounded = true;
                    this.Yvelocity = 0;
                    this.ableToJump = true;
                    this.bounds.y = ((tileIndex.y)*globals.BLOCKSIZE); // Adjust player position to sit on the top of the tile
                    //VERICAL ALIGNMENT
                } else {
                    this.grounded = false;
                    this.applyGravity();
                }
        
            }
            this.factors.characterPosition = this.bounds;
            this.factors.playerPosition = this.player.bounds;
            let action = this.ai.update(this.factors);
            if (action === "attack") {
                this.attack();
            }
            if (action === "defend") {
                this.defend();
            } 
            if (action === "run") {
                this.runAway();
            }
            this.collision();
        }
    }
    hit(n) {
        this.factors.health -= n;
        console.log(this.health)
    }
    collision() {
        for (let i = 0; i < globals.bullets.length; i++) {
            let bullets = new Rect(globals.bullets[i].x,globals.bullets[i].y,globals.bullets[i].w,globals.bullets[i].h)
            if (bullets.intersects(this.bounds) || this.bounds.intersects(bullets)) {
                this.hit(this.player.gun.damage);
            }
        }
    }
    applyGravity() {
        this.Velocity.y += this.gravity
        this.bounds.y += this.Velocity.y
    }
    attack() {
        console.log("Attack")
    }
    defend() {
        console.log("defend")
    }
    runAway() {
        console.log("run away")
    }
    idle() {
        console.log("do nothing")
    }
}

// let player = {
//     bounds: new Rect(100,100,30,30)
// }
// let actions = {
//     "attack": 10,
//     "defend": 3,
//     "run": 1,
//     "idle": 10
// }
// let boss = new Boss(80,player,actions);
// boss.update();