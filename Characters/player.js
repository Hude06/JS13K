import { Rect,Point } from "../Utils/JudeUtils.js";
import { globals } from "../main.js";
import {zzfx} from "../Utils/globals.js"

class Bullet {
    constructor(gunSpeed, directionX,directionY, x, y) {
        this.visible = true;
        this.speed = gunSpeed
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
    }
    update(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, 5, 5);
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;        
    }

}
class Gun {
    constructor(direction, x, y) {
        this.timeLeft = 0;
        this.gunSpeed = 10;
        this.direction = direction;
        this.pos = new Point(x, y);
        this.width = 40
        this.height = 10;
        this.angle = 10;
        this.directionX = 0;
        this.directionY = 0;
    }
    shoot() {
        if (this.timeLeft <= 0) {

            zzfx(...[2.04,,475,.01,.03,.06,4,1.9,-8.7,,,,.09,,36,.2,.17,.67,.04]); // Shoot 118
            this.directionX = Math.cos(this.angle);
            this.directionY = Math.sin(this.angle);
            globals.bullets.push(new Bullet(this.gunSpeed, this.directionX,this.directionY, this.pos.x, this.pos.y));
            this.timeLeft = 10;
        }
    }
    draw(x, y, direction) {
        this.timeLeft -= 0.5;
        this.pos.x = x;
        this.pos.y = y;
        this.direction = direction;
    
        // Calculate the angle between the gun and the mouse
        const dx = globals.mouseX - this.pos.x;
        const dy = globals.mouseY - this.pos.y;
        this.angle = Math.atan2(dy, dx);
    
        // Calculate the center and offsets
        const centerX = this.pos.x + this.width / 2;
        const centerY = this.pos.y + this.height / 2;
        const offsetX = this.width / 2;
        const offsetY = this.height / 2;
    
        // Save the current canvas state
        globals.ctx.save();
    
        // Translate the context to the center of the gun
        globals.ctx.translate(centerX, centerY);
    
        // Rotate the context around the center
        globals.ctx.rotate(this.angle);
    
        // Draw the gun, adjusted to be centered around the new origin
        globals.ctx.fillStyle = "blue";
        globals.ctx.fillRect(0, 0, this.width, this.height);
    
        // Restore the canvas state to its original
        globals.ctx.restore();
    }
}
export class Player {
    constructor() {
        this.bounds = new Rect(500, 500, 30, 30);
        this.gravity = 0.27;
        this.Yvelocity = 0;
        this.Xvelocity = 0;
        this.speed = 2;
        this.friction = 0.75;
        this.jumpHeight = 5;
        this.grounded = false;
        this.timeLeft = 0;
        this.maxSpeed = 2;
        this.isGrounded = false;
        this.ableToJump = false;
        this.gun = new Gun(this.Xvelocity, this.bounds.x, this.bounds.y);

    }
    draw(ctx) {
        this.gun.draw(this.bounds.x,this.bounds.y,this.Xvelocity);
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
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
        //HORIZONTAL ALIGNMENT
        if(right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
            this.bounds.x = tileIndex.x * 32;
            this.Xvelocity = 0
            this.isGrounded = bottom1.WHATBlockAmI == 1;

        } else if(left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
            this.bounds.x = ((tileIndex.x+1)*32)
            this.Xvelocity = 0
            console.log("left")
            this.isGrounded = bottom2.WHATBlockAmI == 1;
        } else {
            this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
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
        if (globals.mouseClicked) {
            this.gun.shoot();
        }
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
            this.jump();
        }
    }

    applyGravity() {
        this.Yvelocity += this.gravity;
        this.bounds.y += this.Yvelocity;
    }

}
