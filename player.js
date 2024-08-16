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
        if (this.direction >= 0) {
            this.x += this.speed;
        }
        if (this.direction < 0) {
            this.x -= this.speed;
        }
    }

}
class Gun {
    constructor(direction, x, y) {
        this.timeLeft = 0;
        this.gunSpeed = 10;
        this.direction = direction;
        this.pos = new Point(x, y);
        this.width = 30
        this.height = 10;
    }
    shoot() {
        if (this.timeLeft <= 0) {
            globals.bullets.push(new Bullet(this.gunSpeed, this.direction, this.pos.x, this.pos.y));
            this.timeLeft = 10;
        }
    }
    draw(x,y,direction) {
        this.pos.x = x;
        this.pos.y = y;
        this.direction = direction
        globals.ctx.fillStyle = "blue";
        if (this.direction >= 0) {
            globals.ctx.fillRect((this.pos.x+75) - this.width, this.pos.y, this.width, this.height);
        }
        if (this.direction < 0) {
            globals.ctx.fillRect(this.pos.x-50, this.pos.y, this.width, this.height);
        }
        this.timeLeft -= 0.3;
    }
}
export class Player {
    constructor() {
        this.bounds = new Rect(500, 500, 30, 30);
        this.gravity = 0.27;
        this.Yvelocity = 0;
        this.Xvelocity = 0;
        this.speed = 1;
        this.friction = 0.75;
        this.jumpHeight = 3;
        this.grounded = false;
        this.timeLeft = 0;
        this.maxSpeed = 2;
        this.isGrounded = false;
        this.ableToJump = false;
        this.gun = new Gun(this.Xvelocity, this.bounds.x, this.bounds.y);

    }
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        this.gun.draw(this.bounds.x,this.bounds.y,this.Xvelocity);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
    }
    

    jump() {
        this.Yvelocity = -this.jumpHeight - 2;
        this.grounded = false
        this.bounds.y -= 5
    }

    update(currentKey, level) {
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
        let bottom1 = level.get(tileIndex.add(0, 1));
        const bottom2 = level.get(tileIndex.add(1, 1));
        globals.debugBlocks.push(right_tile1)
        globals.debugBlocks.push(right_tile2)
        globals.debugBlocks.push(left_tile1)
        globals.debugBlocks.push(left_tile2)
        globals.debugBlocks.push(bottom1)
        globals.debugBlocks.push(bottom2)
        this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
        if (globals.mouseClicked) {
            this.gun.shoot();
        }
        if (this.isGrounded) {
            this.grounded = true;
            this.Yvelocity = 0;
            this.ableToJump = true;
            this.bounds.y = (tileIndex.y) * 32; // Adjust player position to sit on the top of the tile
            //VERICAL ALIGNMENT
        } else {
            this.grounded = false;
            this.applyGravity();
        }

        //HORIZONTAL ALIGNMENT
        if(right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
            this.bounds.x = tileIndex.x * 32;
            this.Xvelocity = 0
        }
        if(left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
            this.bounds.x = ((tileIndex.x+1)*32)
            this.Xvelocity = 0
            console.log("left")
        }
        console.log("l1",left_tile1.WHATBlockAmI,"L2",left_tile2.WHATBlockAmI,"R1",right_tile1.WHATBlockAmI,"R2",right_tile2.WHATBlockAmI,"B1",bottom1.WHATBlockAmI)
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
        if ((((currentKey.get(" ") || currentKey.get("ArrowUp") || currentKey.get("w")) && this.ableToJump) && this.grounded)) {
            console.log("jump")
            this.jump();
        }
    }

    applyGravity() {
        this.Yvelocity += this.gravity;
        this.bounds.y += this.Yvelocity;
    }

}
