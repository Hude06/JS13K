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
        this.bounds = new Rect(100, 32, 16, 16);
        this.gravity = 0.27;
        this.Yvelocity = 0;
        this.Xvelocity = 0;
        this.speed = 1;
        this.friction = 0.8;
        this.jumpHeight = 4;
        this.grounded = false;
        this.timeLeft = 0;
        this.maxSpeed = 3;
    }
    init() {
        const maxAttempts = 10;
        let attempts = 0;
        let intersect = true;
    
        // while (attempts < maxAttempts && intersect) {
        //     // Generate random values for x and y between 100 and 1099
        //     let randomX = Math.floor(Math.random() * 1000) + 100;
        //     let randomY = Math.floor(Math.random() * 1000) + 100;
        //     this.bounds.x = randomX;
        //     this.bounds.y = randomY;
    
        //     intersect = false;
        //     // Iterate through the 2D array
        //     for (let i = 0; i < globals.blocks.length; i++) {
        //         for (let j = 0; j < globals.blocks[i].length; j++) {
        //             if (this.bounds.intersects(globals.blocks[i][j].bounds) || globals.blocks[i][j].bounds.intersects(this.bounds)) {
        //                 intersect = true;
        //                 break;
        //             }
        //         }
        //         if (intersect) break;
        //     }
    
        //     attempts++;
        // }
    
        // if (intersect) {
        //     console.error('Failed to find a non-colliding position');
        // } else {
        //     console.log('Position found at', this.bounds.x, this.bounds.y);
        // }
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.fillStyle = "blue";
        const GUNW = 10
        const GUNH = 5
        this.timeLeft -= 0.5
        if (this.Xvelocity > 0) {
            ctx.fillRect(this.bounds.x + 20, this.bounds.y +5, GUNW, GUNH);
        }
        if (this.Xvelocity < 0) {
            ctx.fillRect(this.bounds.x - 20, this.bounds.y +5, GUNW, GUNH);
        }
        if (globals.mouseClicked) {
            if (this.timeLeft < 0) {
                globals.bullets.push(new Bullet(8, this.Xvelocity, this.bounds.x, this.bounds.y));
                this.timeLeft = 10
            }

        }
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
            this.Xvelocity *= this.friction;
        }
        if (this.Xvelocity > this.maxSpeed) {
            this.Xvelocity = this.maxSpeed;
        } else if (this.Xvelocity < -this.maxSpeed) {
            this.Xvelocity = -this.maxSpeed;
        }
        const tileX = Math.floor(this.bounds.x / 32);
        const tileY = Math.floor(this.bounds.y / 32);
        this.handleMovement(currentKey);
        this.applyGravity();
        if (this.Xvelocity > 0) {
            for (let i = 0; i < level.level.length; i++) {
                for (let j = 0; j < level.level[i].length; j++) {
                    if (level.level[tileY][tileX+1] == 1 || level.level[tileY-1][tileX+1] == 1) {
                        console.log("COLLISION")
                        this.bounds.x = tileX * 32;
                    }
                }
            }
        }
        if (this.Xvelocity < 0) {
            for (let i = 0; i < level.level.length; i++) {
                for (let j = 0; j < level.level[i].length; j++) {
                    if (level.level[tileY][tileX-1] == 1 || level.level[tileY-1][tileX-1] == 1) {
                        console.log("COLLISION")
                        this.bounds.x = tileX * 32 + this.bounds.w+15;
                    }
                }
            }
        }
        if (this.Yvelocity > 0) {
            console.log("FALLING")
            for (let i = 0; i < level.level.length; i++) {
                for (let j = 0; j < level.level[i].length; j++) {
                    if (level.level[tileY+1][tileX] == 1) {
                        console.log("COLLISION")
                        this.bounds.y = tileY * 32;
                        this.grounded = true;
                    }
                }
            }
        }
        this.bounds.x += this.Xvelocity;
    }
 
    handleMovement(currentKey) {
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.Xvelocity -= this.speed
        } else if (currentKey.get("d") || currentKey.get("ArrowRight")) {
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
