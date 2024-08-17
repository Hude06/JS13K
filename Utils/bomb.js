import { globals } from "../main.js";
import { Rect } from "./JudeUtils.js";
export class Bomb {
    constructor(x,y) {
        this.bounds = new Rect(300,10,25,25)
        this.angle = 0
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.2;
        this.mouseX = x
        this.mouseY = y
    }
        update() {         
            const dx = this.mouseX - this.bounds.x;
            const dy = this.mouseY - this.bounds.y;            
            this.angle = Math.atan2(dy, dx);            
            console.log("Angle is",this.angle);
            this.bounds.x += this.velocityX;
            this.bounds.y += this.velocityY;
            this.velocityY += this.gravity;

            this.velocityX = Math.cos(this.angle) * 5;
    }
    draw() {
        globals.ctx.fillStyle = "red";
        globals.ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
}