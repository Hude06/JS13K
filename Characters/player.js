import { Rect,Point } from "../Utils/JudeUtils.js";
import { globals } from "../main.js";
import {zzfx} from "../Utils/globals.js"

class Bullet {
    constructor(gunSpeed, directionX, x, y) {
        this.visible = true;
        this.speed = gunSpeed
        this.x = x;
        this.y = y;
        this.directionX = directionX;
    }
    update(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, 5, 5);
        this.x += this.directionX * this.speed;
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
    }
    shoot() {
        if (this.timeLeft <= 0) {

            zzfx(...[2.04,,475,.01,.03,.06,4,1.9,-8.7,,,,.09,,36,.2,.17,.67,.04]); // Shoot 118
            this.directionX = Math.cos(this.angle);
            this.directionY = Math.sin(this.angle);
            globals.bullets.push(new Bullet(this.gunSpeed, this.directionX, this.pos.x, this.pos.y));
            this.timeLeft = 10;
        }
    }
    update(direction,x,y) {
        this.pos.x = x;
        this.pos.y = y;
        this.directionX = direction;
        this.timeLeft -= 0.5;
        if (direction > 0) {
            this.angle = 0;
        } else if (direction < 0) {
            this.angle = Math.PI;
        }
    }
}
export class Player {
    constructor() {
        this.bounds = new Rect(500, 500, 30, 30);
        this.animator = new Point(0, 0);
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
        this.image = new Image();
        this.image.src = "../Assets/Player-Sheet.png";
        this.frameRate = 60;
        this.frames = 0
        this.health = 3;

    }
    draw(ctx) {
        if (Math.round(this.Xvelocity) !== 0) {
            this.animate();
        }
        console.log(this.Xvelocity)
        ctx.save();
        globals.ctx.filter = 'contrast(120%)';

        this.gun.update(this.Xvelocity,this.bounds.x,this.bounds.y+12);
        ctx.fillStyle = "red";
        if (this.Xvelocity > 0) {
            ctx.drawImage(this.image,this.animator.x,this.animator.y,16, 16, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);

        } else {
            ctx.save();
            ctx.scale(-1, 1);
            const flippedX = -this.bounds.x - this.bounds.w; // Flipped position considering width
            ctx.drawImage(this.image,this.animator.x,this.animator.y,16, 16, flippedX, this.bounds.y, this.bounds.w, this.bounds.h);
            ctx.restore();
        }
        if (globals.debug) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)        
        }
        ctx.restore();
        ctx.fillStyle = "red";
        ctx.fillRect(200+globals.SCROLLX,25,this.health*50,20)
    }
    animate() {
        this.frames += this.frameRate;

        if (this.frames > 500) {
            this.animator.x = 16;
            if (this.frames > 1000) {
                this.frames = 0;
            }
        } else {
            this.animator.x = 0;
        }

    }
    knockback(Xvelocity) {
        if (Math.round(Xvelocity) == 0) {
            this.bounds.x += 100;
            this.jump()
        } else {
            this.bounds.x += Xvelocity*(this.speed*3);
            this.jump();
        }
    }

    jump() {    
        this.Yvelocity = -this.jumpHeight - 2;
        this.grounded = false
        this.bounds.y -= 5
    }
    collision() {
        if (this.bounds.intersects(globals.boss.bounds)) {
            this.health -= 0.25;
            zzfx(...[1.98,,523,.01,.01,.07,2,1.9,-8.7,,,,.09,,36,.2,.17,.67,.04]); // Hit 118
            this.knockback(this.Xvelocity)
        }
    }
    update(currentKey, level) {
        this.Xvelocity *= this.friction;
        if (this.Xvelocity > this.maxSpeed) {
            this.Xvelocity = this.maxSpeed;
        }
        if (this.Xvelocity < -this.maxSpeed) {
            this.Xvelocity = -this.maxSpeed;
        }
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
        globals.debugBlocks.push(right_tile1)
        globals.debugBlocks.push(right_tile2)
        globals.debugBlocks.push(left_tile1)
        globals.debugBlocks.push(left_tile2)
        globals.debugBlocks.push(bottom1)
        globals.debugBlocks.push(bottom2)
        //HORIZONTAL ALIGNMENT
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
            this.bounds.y = (tileIndex.y) * globals.BLOCKSIZE; // Adjust player position to sit on the top of the tile
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
        this.collision();
        if (this.health <= 0) {
            zzfx(...[2,,727,.01,.03,.53,3,1.39,.9,.1,,,,1.9,-44,.4,.39,.31,.12]); // Explosion 334
            alert("Game Over");
            globals.reset();
        }
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
