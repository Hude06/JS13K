export class Globals {
    constructor() {
        this.currentKey = new Map();
        this.blocks = [];
        this.SCROLLX = 200;
        this.debug = false;
        this.SCROLLY = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.bullets = [];
        this.mouseClicked = false
        this.BLOCKSIZE = 32;
        this.debugBlocks = []
    }
}