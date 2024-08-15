import {Player} from './player.js';
import {Level} from './level.js';
import {Globals} from './globals.js';
import { ParticleEngine } from './particalEngine.js';
export let globals = new Globals();
let player = new Player();
let LevelWIDTH = 50
let LevelHEIGHT = 40
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

function CreateGameLevel(LevelHEIGHT, LevelWIDTH) {
    let GameLevel1 = [];

    for (let i = 0; i < LevelHEIGHT; i++) {
        const row = [];
        for (let j = 0; j < LevelWIDTH; j++) {
            let rando = Math.floor(Math.random() * 4);
            row.push(rando);
        }
        GameLevel1.push(row);
    }
    

    return GameLevel1; // Return the generated level data
}
let level1 = new Level(globals.blocks, CreateGameLevel(LevelHEIGHT, LevelWIDTH));
function keyboardInit() {
    window.addEventListener("keydown", (e) => {
        globals.currentKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        globals.currentKey.set(e.key, false);
    });
}

function loop() {
    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect(0,0,canvas.width,canvas.height);
    globals.ctx.save()
    globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
    particleEngine.update(0.01);
    player.update(globals.currentKey,globals.blocks);
    //DRAWING
    particleEngine.draw();
    globals.bullets.forEach(bullet => {
        bullet.update(globals.ctx);
    });
    for (let i = 0; i < globals.blocks.length; i++) {
        globals.blocks[i].draw(globals.ctx);
    }
    player.draw(globals.ctx,particleEngine);
    globals.SCROLLX = player.bounds.x - canvas.width/2;
    globals.ctx.restore();
    requestAnimationFrame(loop);
}    
function init() {
    level1.init();
    player.init();
    keyboardInit();
    loop();
}
init();