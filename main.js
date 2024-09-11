import {Player} from './Characters/player.js';
import {Level} from './Utils/level.js';
import {Globals} from './Utils/globals.js';
import { drawText } from './Utils/font.js';
import { startTyping } from './Utils/font.js';
import { Boss } from './Utils/boss.js';
import { alert_box } from './Utils/alert_box.js';
export let globals = new Globals();
let player = new Player();
let actions = {
    "attack": 15,
    "defend": 10,
    "run": 5,
    "idle": 4
}
let boss = new Boss(100,player,actions);
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
let level1 = new Level(globals.blocks,globals.GameLevel1Options.level,globals.GameLevel1Options);
let intro = new Level(globals.blocks,globals.IntroOptions.level,globals.IntroOptions)
function keyboardInit() {
    window.addEventListener("keydown", (e) => {
        globals.currentKey.set(e.key, true);
        globals.navKey.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
        globals.currentKey.set(e.key, false);
        globals.navKey.set(e.key, false);
    });
}
let part = 0;
function loop() {
    //SETUP Canvas
    globals.debugBlocks = []
    globals.ctx.fillStyle = "black";
    globals.ctx.imageSmoothingEnabled = false;
    globals.ctx.fillRect(0,0,canvas.width,canvas.height);
    //Translating the canvas to the player position
    //UPDATE
    if (globals.currentScreen == "splash") {
        drawText("The 13th Challenge", globals.canvas.width/6, globals.canvas.height/2-50, 75,1);
        drawText("JS13K by Jude Hill", globals.canvas.width/4, globals.canvas.height/2+50, 50,1);
        drawText("Press Enter to start", globals.canvas.width/3.25, globals.canvas.height/2+125, 35,1,0);
        if (globals.currentKey.get("Enter")) {
            setTimeout(() => {
                if (globals.debug) {
                    globals.currentLevel = level1;
                    const song = globals.currentLevel.options.song;
                    let mySongData = zzfxM(...song);                    
                    let myAudioNode = zzfxP(...mySongData);
                    console.log("Music is starting")

                }
            }, 200);
            if (globals.debug) {
                globals.currentScreen = "game";
            } else {
                globals.currentScreen = "intro";
            }
        }
    }
    if (globals.currentScreen == "intro") {
        globals.ctx.save()
        globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
        globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
        globals.currentLevel = intro
        if (part === 0) {
            drawText("This is your player he has gravity",200,400,20)
        }
        if (part === 1) {
            drawText("Use W A S D or The Arrow Keys",275,400,20)
            drawText("to run around and jump",330,425,20)
        }
        if (part === 2) {
            drawText("Click to shoot a bullet",325,400,20)
        }
        if (part === 3) {
            drawText("You have a phobia about running out of bullets",100,400,20)
            drawText("You only have 13 left ....",325,425,20)

        }
        if (part === 4) {
            drawText("dont run out or else",350,400,20)

        }
        if (part == 5) {
            player.reset();
            globals.currentScreen = "game";
            globals.currentLevel = level1;
            const buffer = zzfxM(globals.currentLevel.options.music);
            const node = zzfxP(...buffer);
            part = null
        }
        for (let i = 0; i < globals.blocks.length; i++) {
            globals.blocks[i].draw(globals.ctx,globals.currentLevel.options.tint.r,globals.currentLevel.options.tint.g,globals.currentLevel.options.tint.b);
        }
        player.draw(globals.ctx);
        
        globals.bullets.forEach(bullet => {
            bullet.update(globals.ctx);
        });
        
        setTimeout(() => {
            player.update(globals.currentKey,globals.currentLevel);
            setTimeout(() => {
                if (part < 1) {
                    part = 1
                }
                setTimeout(() => {
                    if (part < 2) {
                        part = 2
                    }
                    setTimeout(() => {
                        if (part < 3) {
                            part = 3
                        }
                        setTimeout(() => {
                            if (part < 4) {
                                part = 4
                            }
                            setTimeout(() => {
                                if (part < 5) {
                                    part = 5
                                }
                            },4000)
                        },4000)
                    },2500)
                },2500)
            }, 2000);
        }, 1000);    
        globals.SCROLLX = (player.bounds.x - canvas.width/2)/1.4;
        globals.ctx.restore();
    }
    if (globals.currentScreen == "game") {
        globals.ctx.save()
        globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
        globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
        globals.particleEngine.update(0.01);
        player.update(globals.currentKey,globals.currentLevel);
        boss.update(globals.currentLevel);
        //DRAWING
        globals.particleEngine.draw();
        globals.bullets.forEach(bullet => {
            bullet.update(globals.ctx);
        });
        if (globals.debug == true) {
            alert_box("Debug Mode is on right now this is centered and this is cool");
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
            globals.blocks[i].draw(globals.ctx,globals.currentLevel.options.tint.r,globals.currentLevel.options.tint.g,globals.currentLevel.options.tint.b);
        }
        player.draw(globals.ctx,globals.particleEngine);
        for (let i = 0; i < globals.enemys.length; i++) {
            globals.enemys[i].draw();
            globals.enemys[i].update(globals.currentLevel);

        }
        drawText("LEVEL1", 350, 200, 75);
        boss.draw();
        //END DRAWING
        globals.SCROLLX = (player.bounds.x - canvas.width/2)/1.4;
        globals.ctx.restore();
    }

    globals.navKey.clear();
    requestAnimationFrame(loop);
}    
function init() {
    if (globals.currentScreen == "splash") {
        startTyping(100)
    }
    level1.init();
    keyboardInit();
    loop();
}
init();