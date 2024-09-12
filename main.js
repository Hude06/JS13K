import {Player} from './Characters/player.js';
import {Level} from './Utils/level.js';
import {Globals} from './Utils/globals.js';
import { Boss } from './Utils/boss.js';
import { Text } from './Utils/font.js';
export let globals = new Globals();
let player = new Player();
let actions = {
    "attack": 15,
    "defend": 10,
    "run": 5,
    "idle": 4
}
let boss = new Boss(100,player,actions);
globals.boss = boss;
globals.mobsLeft += 1;
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
let intro = new Level(globals.blocks,globals.IntroOptions.level,globals.IntroOptions,"intro");
let level1 = new Level(globals.blocks,globals.GameLevel1Options.level,globals.GameLevel1Options,"level1");
console.log(globals.IntroOptions)
let challangeText = new Text("The 13th Bullet",globals.canvas.width/5,globals.canvas.height/2-50,75,10,false);
let js13k = new Text("JS13K by a 15 year old",globals.canvas.width/4.5,globals.canvas.height/2+50,50,5,false);
let pressEnter = new Text("Press Enter to start",globals.canvas.width/3.25,globals.canvas.height/2+125,35,5,true);

let AsTheLast = new Text("As the last bullet fires and the weapon falls silent",400,100,20,15,false)
let AnOverwhelming = new Text("an overwhelming dread engulfs him",600,125,20,15,false)
let AndHeFeels = new Text("and he feels himself growing larger",585,150,20,15,false)
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
let IntroText1 = new Text("This is your player",415,200,20,20,false)
let KeyboardText1 = new Text("Use W A S D or The Arrow Keys",325,200,20,20,false)
let RunAroundJump = new Text("to run around and jump",400,230,20,20,false)
let PhobiaText = new Text("You have a phobia about running out of bullets",200,200,20,20,false)
let PhobiaText2 = new Text("You only have 13 left ....",400,230,20,20,false)
let BulletText = new Text("Click to shoot a bullet",375,400,20,20,false)
let DontRunOut = new Text("Whatever you do dont run out of bullets",280,400,20,20,false)
let PressEnterToSkip = new Text("Press Enter to skip",10,10,15,500,true)
let end = new Text("You died with " + globals.kills + " kill", 700, 200, 25, 20, false);
function loop() {
    globals.debugBlocks = []
    globals.ctx.fillStyle = "black";
    globals.ctx.imageSmoothingEnabled = false;
    globals.ctx.clearRect(0,0,globals.canvas.width,globals.canvas.height);
    if (globals.currentScreen == "splash") {
        challangeText.draw();
        js13k.draw();
        pressEnter.draw();
        challangeText.startTyping();
        js13k.startTyping();
        pressEnter.startTyping();
        if (globals.currentKey.get("Enter")) {
            setTimeout(() => {
                globals.currentScreen = "intro";
                intro.init();
                
            }, 10);
        }
    }
    if (globals.currentScreen == "end") {
        end.text = "You died with " + globals.kills + " kill";
        end.draw();
        end.startTyping();
    }
    if (globals.currentScreen == "intro") {
        globals.ctx.save()
        globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
        globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
        globals.currentLevel = intro
        PressEnterToSkip.draw();
        PressEnterToSkip.startTyping();
        setTimeout(() => {
            if (globals.currentKey.get("Enter")) {
                player.reset();
                globals.currentScreen = "game";
                globals.currentLevel = level1;
                const song = globals.currentLevel.options.song;
                let mySongData = globals.zzfxM(...song);                    
                let myAudioNode = globals.zzfxP(...mySongData);
                part = null        
            }
        },1000)
        if (part === 0) {
            PhobiaText.draw();
            PhobiaText.startTyping();
            PhobiaText2.draw();
            PhobiaText2.startTyping();
            setTimeout(() => {
                part = 1;
            },5000)
        }
        if (part === 1) {
            IntroText1.draw();
            IntroText1.startTyping();
            setTimeout(() => {
                part = 2;
            }, 5000);
        }

        if (part === 2) {
            KeyboardText1.draw();
            KeyboardText1.startTyping();
            RunAroundJump.draw();
            RunAroundJump.startTyping();
            setTimeout(() => {
                part = 3;
            }, 5000);
        }
        if (part === 3) {
            BulletText.draw();
            BulletText.startTyping();
            setTimeout(() => {
                part = 4;
            }, 5000);
        }
        if (part === 4) {
            DontRunOut.draw();
            DontRunOut.startTyping();
            setTimeout(() => {
                part = 5;
            }, 7500);
        }
        if (part == 5) {
            player.reset();
            globals.currentScreen = "game";
            globals.currentLevel = level1;
            const song = globals.currentLevel.options.song;
            let mySongData = globals.zzfxM(...song);                    
            let myAudioNode = globals.zzfxP(...mySongData);
            part = null
        }
        for (let i = 0; i < globals.blocks.length; i++) {
            globals.blocks[i].draw(globals.ctx,globals.currentLevel.options.tint.r,globals.currentLevel.options.tint.g,globals.currentLevel.options.tint.b);
        }
        player.draw(globals.ctx);
        globals.bullets.forEach(bullet => {
            bullet.update(globals.ctx);
        });
        player.update(globals.currentKey,globals.currentLevel);
        globals.SCROLLX = (player.bounds.x - globals.canvas.width/2)/1.4;
        globals.ctx.restore();
    }
    if (globals.currentScreen === "big") {
        AsTheLast.draw();
        AnOverwhelming.draw();
        AndHeFeels.draw();

            AsTheLast.startTyping();
            setTimeout(() => {
                AnOverwhelming.startTyping();
                setTimeout(() => {
                    AndHeFeels.startTyping();
                },3500)
            }, 6000);  
    }
    if (globals.currentScreen == "game") {
        globals.timePlayed += 0.05
        globals.ctx.save()
        globals.ctx.scale(1.25, 1.25) // Doubles size of anything draw to canvas.
        globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
        globals.particleEngine.update(0.01);
        player.update(globals.currentKey,globals.currentLevel);
        boss.update(globals.currentLevel);
        globals.particleEngine.draw();
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
            globals.blocks[i].draw(globals.ctx,globals.currentLevel.options.tint.r,globals.currentLevel.options.tint.g,globals.currentLevel.options.tint.b);
        }
        player.draw(globals.ctx,globals.particleEngine);
        for (let i = 0; i < globals.enemys.length; i++) {
            globals.enemys[i].draw();
            globals.enemys[i].update(globals.currentLevel);

        }
        if (globals.PlayerToBig) {
            globals.currentScreen = "big"
        }
        if (!globals.PlayerToBig) {
            let leveltext = new Text(globals.currentLevel.id, 350, 200, 75,500,false);
            leveltext.draw();
            }
        boss.draw();
        //END DRAWING
        globals.SCROLLX = (player.bounds.x - globals.canvas.width/2)/1.4;
        globals.ctx.restore();
    }
    console.log(globals.mobsLeft)
    if (globals.mobsLeft < 1) {
        // console.log("You have killed all the mobs")
    }
    globals.navKey.clear();
    requestAnimationFrame(loop);
}    
function init() {
    keyboardInit();
    loop();
}
init();