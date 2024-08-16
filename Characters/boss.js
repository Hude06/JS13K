import { globals } from "../main.js";
import { Rect, Point } from "../Utils/JudeUtils.js";

export class Boss {
    constructor(follow) {
        this.bounds = new Rect(200, 200, 30, 30);
        this.gravity = 0.27;
        this.Yvelocity = 0;
        this.Xvelocity = 0;
        this.speed = 2;
        this.jumpHeight = 3;
        this.grounded = false;
        this.player = follow;
    }
    update(level) {
        this.bounds.y += this.Yvelocity;
        this.bounds.x += this.Xvelocity;
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
            //VERICAL ALIGNMENTad
        } else {
            this.grounded = false;
            this.applyGravity();
        }
        this.followPlayer();
        if (this.bounds.y > this.player.bounds.y) {
            this.jump();
        }
    }
    followPlayer() {
        if (this.player.bounds.x > this.bounds.x) {
            this.Xvelocity = this.speed;
        } else {
            this.Xvelocity = -this.speed
        }
    }
    applyGravity() {
        this.Yvelocity += this.gravity;
    }
    jump() {
        if (this.grounded) {
            this.Yvelocity -= this.jumpHeight;
            this.grounded = false;
        }
    }
    draw() {
        globals.ctx.fillStyle = "red";
        globals.ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
