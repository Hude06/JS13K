import { Rect,Point } from "./JudeUtils.js";
import { globals } from "./main.js";
class Bullet {
    constructor(gunSpeed, direction, x, y) {
        this.visible = true;
        this.speed = gunSpeed
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    update(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, 5, 5);
        if (this.direction > 0) {
            this.x += this.speed;
        }
        if (this.direction < 0) {
            this.x -= this.speed;
        }
    }

}
export class Player {
    constructor() {
        this.bounds = new Rect(100, 32, 32, 32);
        this.gravity = 0.27;
        this.Yvelocity = 0;
        this.Xvelocity = 0;
        this.speed = 1;
        this.friction = 0.75;
        this.jumpHeight = 4;
        this.grounded = false;
        this.timeLeft = 0;
        this.maxSpeed = 2;
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        // ctx.fillStyle = "blue";
        // const GUNW = 10
        // const GUNH = 5
        // this.timeLeft -= 0.5
        // if (this.Xvelocity > 0) {
        //     ctx.fillRect(this.bounds.x + 20, this.bounds.y +5, GUNW, GUNH);
        // }
        // if (this.Xvelocity < 0) {
        //     ctx.fillRect(this.bounds.x - 20, this.bounds.y +5, GUNW, GUNH);
        // }
        // if (globals.mouseClicked) {
        //     if (this.timeLeft < 0) {
        //         globals.bullets.push(new Bullet(8, this.Xvelocity, this.bounds.x, this.bounds.y));
        //         this.timeLeft = 10
        //     }

        // }
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
    }
    

    jump() {
        this.grounded = false;
        this.Yvelocity = -this.jumpHeight - 2;
        this.bounds.y -= 5;
    }

    update(currentKey, level) {
        if (this.grounded) {
            this.Yvelocity = 0;
        } else {
            this.applyGravity();
        }
        this.Xvelocity *= this.friction;
        if (this.Xvelocity > this.maxSpeed) {
            this.Xvelocity = this.maxSpeed;
        }
        if (this.Xvelocity < -this.maxSpeed) {
            this.Xvelocity = -this.maxSpeed;
        }
        const tileX = Math.floor(this.bounds.x / 32);
        const tileY = Math.floor(this.bounds.y / 32);
        const tileIndex = new Point(tileX, tileY);
        const tileContents = level.get(tileIndex)
        const right_tile1 = level.get(tileIndex.add(1, 0));
        const right_tile2 = level.get(tileIndex.add(1, 1));
        const left_tile1 = level.get(tileIndex.add(0, 0));
        const left_tile2 = level.get(tileIndex.add(0, 1));
        const bottom1 = level.get(tileIndex.add(0, 1));
        const bottom2 = level.get(tileIndex.add(1, 1));

        globals.debugBlocks.push(right_tile1)
        globals.debugBlocks.push(right_tile2)
        globals.debugBlocks.push(left_tile1)
        globals.debugBlocks.push(left_tile2)
        globals.debugBlocks.push(bottom1)
        globals.debugBlocks.push(bottom2)

        if (bottom1.WHATBlockAmI == 1 && bottom2.WHATBlockAmI == 1) {
            this.grounded = true;
            this.bounds.y = (tileIndex.y) * 32;
        } else {
            this.grounded = false;
        }
        if(right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
            this.bounds.x = tileIndex.x * 32;
        }
        if(left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
            this.bounds.x = (tileIndex.x+1)*32
            this.Xvelocity = 0
        }
        console.log("l1",left_tile1.WHATBlockAmI,"L2",left_tile2.WHATBlockAmI,"R1",right_tile1.WHATBlockAmI,"R2",right_tile2.WHATBlockAmI,"B1",bottom1.WHATBlockAmI,"B2",bottom2.WHATBlockAmI)
        this.handleMovement(currentKey);
        this.bounds.x += this.Xvelocity;
    }
 
    handleMovement(currentKey) {
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.Xvelocity -= this.speed
        } 
        if (currentKey.get("d") || currentKey.get("ArrowRight")) {
            this.Xvelocity += this.speed
        }
        if ((currentKey.get(" ") || currentKey.get("ArrowUp") || currentKey.get("w")) && this.grounded == true) {
            this.jump();
        }
    }

    applyGravity() {
        this.Yvelocity += this.gravity;
        this.bounds.y += this.Yvelocity;
    }

}
