import {Player} from './player.js';
import {Level} from './level.js';
import {Globals} from './globals.js';
import { ParticleEngine } from './particalEngine.js';
export let globals = new Globals();
let player = new Player();
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

let GameLevel1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
];

let level1 = new Level(globals.blocks, GameLevel1);
function keyboardInit() {
    window.addEventListener("keydown", (e) => {
        globals.currentKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        globals.currentKey.set(e.key, false);
    });
}

function loop() {
    globals.ctx.clearRect(0, 0, canvas.width, canvas.height);
    globals.ctx.fillStyle = "black";
    globals.ctx.fillRect(0,0,canvas.width,canvas.height);
    particleEngine.update(0.01);
    particleEngine.draw();

    for (let i = 0; i < globals.blocks.length; i++) {
        globals.blocks[i].draw(globals.ctx);
    }
    globals.bullets.forEach(bullet => {
        bullet.update(globals.ctx);
    });
    player.draw(globals.ctx,particleEngine);
    player.update(globals.currentKey,globals.blocks);
    requestAnimationFrame(loop);
}    
function init() {
    level1.init();
    keyboardInit();
    loop();
}
init();