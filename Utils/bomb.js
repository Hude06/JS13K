import { globals } from "../main.js";
import { Rect,Point } from "./JudeUtils.js";
import { ParticleEngine } from "./particalEngine.js";
export class Bomb {
    constructor(x,y,startX,startY) {
        this.bounds = new Rect(startX,startY,25,25)
        this.angle = 0
        this.velocityY = -10;
        this.velocityX = 0;
        this.gravity = 0.2;
        this.mouseX = x
        this.mouseY = y
        this.startX = startX
        this.startY = startY
        this.isGrounded = false;
        this.grounded = false;
        this.timeLeft = 5;
        
    }
        update(level) {    
            this.timeLeft -= 0.03
            if (this.timeLeft <= 0) {
                globals.bombs.splice(globals.bombs.indexOf(this), 1);
                globals.particleEngine.spawnParticles(this.bounds.x,this.bounds.y)
            }
            console.log("Bomb created",this.startX,this.startY)     
            const dx = this.mouseX - this.bounds.x;
            const dy = this.mouseY - this.bounds.y;            
            this.angle = Math.atan2(dy, dx);            
            console.log("Angle is",this.angle);
            this.bounds.x += this.velocityX;
            this.bounds.y += this.velocityY;
            this.velocityY += this.gravity;
            this.velocityX = Math.cos(this.angle) * 5;
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
            globals.debugBlocksBomb.push(right_tile1)
            globals.debugBlocksBomb.push(right_tile2)
            globals.debugBlocksBomb.push(left_tile1)
            globals.debugBlocksBomb.push(left_tile2)
            globals.debugBlocksBomb.push(bottom1)
            globals.debugBlocksBomb.push(bottom2)
            //HORIZONTAL ALIGNMENT
            if (right_tile2 !== null) {
                if(right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
                    this.bounds.x = tileIndex.x * globals.BLOCKSIZE;
                    this.Xvelocity = 0
                    this.isGrounded = bottom1.WHATBlockAmI == 1;
        
                } else if(left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
                    this.bounds.x = ((tileIndex.x+1)*globals.BLOCKSIZE)
                    this.velocityX = 0
                    this.isGrounded = bottom2.WHATBlockAmI == 1;
                } else {
                    this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
                }
                if (this.isGrounded) {
                    this.grounded = true;
                    this.velocityY = 0;
                    this.bounds.y = ((tileIndex.y)*globals.BLOCKSIZE); // Adjust player position to sit on the top of the tile
                    //VERICAL ALIGNMENT
                } else {
                    this.grounded = false;
                }
            }
    }
    draw() {
        globals.ctx.fillStyle = "red";
        globals.ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
}