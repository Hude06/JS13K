import { Rect } from "./JudeUtils.js";
import { globals } from "../main.js";
const BLOCKSIZE = 32;
export class Block {
    constructor(x,y,WHATBlockAmI) {
        this.bounds = new Rect(x, y, BLOCKSIZE, BLOCKSIZE);
        this.tileSet = new Image();
        this.tileSet.src = "../Assets/Tileset.png";
        this.WHATBlockAmI = WHATBlockAmI
    }
    draw(ctx,r,g,b) {
      ctx.imageSmoothingEnabled = false;
      if (this.WHATBlockAmI == 1) {
          ctx.drawImage(this.tileSet, 32, 8, 8, 8, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
          ctx.save()
          ctx.globalCompositeOperation = 'source-atop'; 
          ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
          ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);

          ctx.restore();
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

  get(tileIndex) {
    // Extract x and y coordinates from the tileIndex object
    let x = tileIndex.x;
    let y = tileIndex.y;
    // Find the block corresponding to this tile value
    for (let block of this.blocks) {
      // Check if the block's position matches the tile index
      if (block.bounds.x === x * BLOCKSIZE && block.bounds.y === y * BLOCKSIZE) {
        return block;
      }
    }
      return null; // Return null or an appropriate default value if block not found
  }

  init() {
    this.height = this.level.length;
    this.width = this.level[0].length;

    for (let i = 0; i < this.level.length; i++) {
      for (let w = 0; w < this.level[i].length; w++) {
        let block = this.level[i][w];
        this.x = w;
        this.y = i;
        this.blocks.push(new Block(this.x * BLOCKSIZE, this.y * BLOCKSIZE, block));
      }
    }
  }
}