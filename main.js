import {Player} from './Characters/player.js';
import {Level} from './Utils/level.js';
import {Globals} from './Utils/globals.js';
import { ParticleEngine } from './Utils/particalEngine.js';
import { Enemy } from './Characters/enemy.js';
import {zzfx} from "./Utils/globals.js"
import { drawText } from './Utils/font.js';
import { Bomb } from './Utils/bomb.js';
export let globals = new Globals();
let player = new Player();
var stats = new Stats();
globals.enemys.push(new Enemy(player));
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
globals.canvas.addEventListener("mousedown", (_) => {
    globals.mouseClicked = true;
})
globals.canvas.addEventListener("mouseup", (_) => {
    globals.mouseClicked = false;
})
globals.canvas.addEventListener("mousemove", (e) => {
    globals.mouseX = e.clientX;
    globals.mouseY = e.clientY;
})
const particleEngine = new ParticleEngine(globals.ctx, {
    color: 'red',
    size: 3,
    count: 50,
    duration: 0.25 // 2 seconds
});
const rowPattern = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const emptyRow = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1];
const GameLevel1 = [
    rowPattern,
    rowPattern,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    rowPattern,
    rowPattern,
]
const GameLevel1Options = {
    level: GameLevel1,
    tint: {
        r: 145,
        g: 144,
        b: 144
    }
}
let currentLevel = GameLevel1Options;
let level1 = new Level(globals.blocks,currentLevel.level);
function keyboardInit() {
    window.addEventListener("keydown", (e) => {
        globals.currentKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        globals.currentKey.set(e.key, false);
    });
}

function loop() {
    stats.begin();
    globals.debugBlocks = []
    globals.ctx.fillStyle = "black";
    globals.ctx.imageSmoothingEnabled = false;
    globals.ctx.fillRect(0,0,canvas.width,canvas.height);
    globals.ctx.save()
    globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
    globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
    particleEngine.update(0.01);
    player.update(globals.currentKey,level1);
    for (let i = 0; i < globals.bombs.length; i++) {
        globals.bombs[i].update();
    }
    //DRAWING
    particleEngine.draw();
    globals.bullets.forEach(bullet => {
        bullet.update(globals.ctx);
    });
    if (globals.debug == true) {
        for (let i = 0; i < globals.debugBlocks.length; i++) {
            globals.ctx.lineWidth = 5
            globals.ctx.strokeStyle = "red";
            if (i == 4) {
                //BOTTOM1
                globals.ctx.strokeStyle = "blue";
            }
            if (i == 5) {
                //Bottom2
                globals.ctx.strokeStyle = "green";
            }
            globals.ctx.strokeRect(globals.debugBlocks[i].bounds.x, globals.debugBlocks[i].bounds.y, globals.debugBlocks[i].bounds.w, globals.debugBlocks[i].bounds.h);
        }
    }
    for (let i = 0; i < globals.blocks.length; i++) {
        globals.blocks[i].draw(globals.ctx,currentLevel.tint.r,currentLevel.tint.g,currentLevel.tint.b);
    }
    player.draw(globals.ctx,particleEngine);
    for (let i = 0; i < globals.enemys.length; i++) {
        globals.enemys[i].draw();
        globals.enemys[i].update(level1);

    }
    drawText("LEVEL1", 350, 200, 75,1);
    for (let i = 0; i < globals.bombs.length; i++) {
        globals.bombs[i].draw();
    }
    globals.SCROLLX = (player.bounds.x - canvas.width/2)/1.4;
    globals.ctx.restore();
    stats.end();
    requestAnimationFrame(loop);
}    
function init() {
    level1.init();
    keyboardInit();
    loop();
}
init();