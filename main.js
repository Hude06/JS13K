import {Player} from './player.js';
import {Level} from './level.js';
import {Globals} from './globals.js';
import { ParticleEngine } from './particalEngine.js';
export let globals = new Globals();
let player = new Player();
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
globals.canvas.addEventListener("mousedown", (_) => {
    globals.mouseClicked = true;
})
globals.canvas.addEventListener("mouseup", (_) => {
    globals.mouseClicked = false;
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
        r: 255,
        g: 0,
        b: 0
    }
}
let currentLevel = GameLevel1Options;
// function CreateGameLevel(LevelHEIGHT, LevelWIDTH) {
//     let GameLevel1 = [];

//     for (let i = 0; i < LevelHEIGHT; i++) {
//         const row = [];
//         for (let j = 0; j < LevelWIDTH; j++) {
//             let rando = Math.floor(Math.random() * 4);
//             row.push(rando);
//         }
//         GameLevel1.push(row);
//     }
    
//     console.log(GameLevel1)
//     return GameLevel1; // Return the generated level data
// }
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
    globals.ctx.fillRect(0,0,canvas.width,canvas.height);
    globals.ctx.save()
    globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
    globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
    particleEngine.update(0.01);
    player.update(globals.currentKey,level1);
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
        console.log(currentLevel.tint.r)
        globals.blocks[i].draw(globals.ctx,currentLevel.tint.r,currentLevel.tint.g,currentLevel.tint.b);
    }
    player.draw(globals.ctx,particleEngine);
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