import { Rect } from "./JudeUtils.js";
const BLOCKSIZE = 32;
class LevelGenerator {
  
}
export class Block {
    constructor(x,y,WHATBlockAmI) {
        this.bounds = new Rect(x, y, BLOCKSIZE, BLOCKSIZE);
        this.tileSet = new Image();
        this.tileSet.src = "./Tileset.png";
        this.WHATBlockAmI = WHATBlockAmI
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        if (this.WHATBlockAmI == 1) {
            ctx.drawImage(this.tileSet,32,8,8,8,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
        }
    }
}
export class Level {
    constructor(b, l) {
      this.width;
      this.height;
      this.blocks = b;
      this.level = l;
      this.x = 1;
      this.y = 1;
    }
    init() {
      for (let i = 0; i < this.level.length; i++) {
        for (let w = 0; w < this.level[i].length; w++) {
          let block = this.level[i][w];
          this.x = w;
          this.y = i;
          this.width = this.level.length;
          this.height = this.level[i].length;
          this.blocks.push(new Block(this.x*BLOCKSIZE, this.y*BLOCKSIZE,block));
    
        }
      }
    }
  }