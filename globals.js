export class Globals {
    constructor() {
        this.currentKey = new Map();
        this.blocks = [];
        this.SCROLLX = 0;
        this.SCROLLY = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.bullets = [];
        this.mouseClicked = false
    }
}