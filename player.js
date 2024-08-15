import { Rect } from "./JudeUtils.js";
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
        if (this.direction == 1) {
            this.x += this.speed;
        }
        if (this.direction == -1) {
            this.x -= this.speed;
        }
    }

}
export class Player {
    constructor() {
        this.bounds = new Rect(1000, 0, 16, 16);
        this.gravity = 0.27;
        this.velocity = 0;
        this.speed = 3;
        this.jumpHeight = 4;
        this.isJumping = false;
        this.isCollidingDown = false;
        this.direction = 1;
        //1 = right
        //0 = left
        this.ableToShoot = true;
        this.timeLeft = 0;
        this.KnockBack = 50;
        this.velocityX = 0;
        this.collidingDirection = '';
    }
    init() {
        console.log("Blocks Are", globals.blocks);
        const maxAttempts = 10;
        let attempts = 0;
        let intersect = true;
    
        while (attempts < maxAttempts && intersect) {
            // Generate random values for x and y between 100 and 1099
            let randomX = Math.floor(Math.random() * 1000) + 100;
            let randomY = Math.floor(Math.random() * 1000) + 100;
            this.bounds.x = randomX;
            this.bounds.y = randomY;
    
            intersect = false;
            // Iterate through the 2D array
            for (let i = 0; i < globals.blocks.length; i++) {
                for (let j = 0; j < globals.blocks[i].length; j++) {
                    if (this.bounds.intersects(globals.blocks[i][j].bounds) || globals.blocks[i][j].bounds.intersects(this.bounds)) {
                        intersect = true;
                        break;
                    }
                }
                if (intersect) break;
            }
    
            attempts++;
        }
    
        if (intersect) {
            console.error('Failed to find a non-colliding position');
        } else {
            console.log('Position found at', this.bounds.x, this.bounds.y);
        }
    }
    draw(ctx,particalEngine) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.fillStyle = "blue";
        const GUNW = 10
        const GUNH = 5
        this.timeLeft -= 0.5
        if (this.direction == 1) {
            ctx.fillRect(this.bounds.x + 20, this.bounds.y +5, GUNW, GUNH);
        }
        if (this.direction == -1) {
            ctx.fillRect(this.bounds.x - 20, this.bounds.y +5, GUNW, GUNH);
        }
        if (globals.mouseClicked) {
            if (this.timeLeft < 0) {
                if (this.direction == 1) {
                    particalEngine.spawnParticles(this.bounds.x+10, this.bounds.y);
                }
                if (this.direction == -1) {
                    particalEngine.spawnParticles(this.bounds.x-10, this.bounds.y);
                }
                globals.bullets.push(new Bullet(5, this.direction, this.bounds.x, this.bounds.y));
                this.timeLeft = 10
            }

        }
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
    }
    

    jump(height) {
        this.isJumping = true;
        if (height) {
            this.velocity = -height - 2;
            this.bounds.y -= 5;

        } else {
            this.velocity = -this.jumpHeight - 2;
            this.bounds.y -= 5;
        }
    }

    update(currentKey, blocks) {
        this.handleMovement(currentKey);
        this.applyGravity();
    
        // Handle Collisions
        for (const block of blocks) {
            if (this.bounds.intersects(block.bounds) || block.bounds.intersects(this.bounds)) {
                if (block.WHATBlockAmI == 1) {
                    this.handleCollision(block, currentKey);
                }
            }
        }
    }

    handleMovement(currentKey) {
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.direction = -1;
            this.bounds.x -= this.speed;
        }
        if (currentKey.get("d") || currentKey.get("ArrowRight")) {
            this.direction = 1;
            this.bounds.x += this.speed
        }
        if ((currentKey.get(" ") || currentKey.get("ArrowUp") || currentKey.get("w")) && this.isJumping == false) {
            this.jump();
        }
    }

    applyGravity() {
        this.velocity += this.gravity;
        this.bounds.y += this.velocity;
    }

    handleCollision(block, currentKey) {
        if (currentKey.get(" ") || currentKey.get("ArrowUp") || this.velocity < 0) {
            this.bounds.y = (block.bounds.y + this.bounds.h)+15;
            this.velocity = 0
        }
    }
}
