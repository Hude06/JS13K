import { Rect } from "./JudeUtils.js";
import { UtilityAI } from "./utilityAI.js";
class Boss {
    constructor(health,player,actions) {
        this.bounds = new Rect(100, 100, 30, 30);
        this.actions = actions || {
            "attack": 10,
            "defend": 3,
            "run": 1,
            "idle": 10
        }
        this.factors = {
            health: health, // Example health value (critically low)
            characterPosition: this.bounds,
            playerPosition: player.bounds,
            position: '', // Will be set in the update method
            gameState: '' // Will be set in the update method
        };
        this.ai = new UtilityAI(this.actions);
        this.health = health;
        this.player = player;
    }
    update() {
        this.factors.characterPosition = this.bounds;
        this.factors.playerPosition = this.player.bounds;
        console.log(this.ai.update(this.factors))
    }
}
// let player = {
//     bounds: new Rect(100,100,30,30)
// }
// let actions = {
//     "attack": 10,
//     "defend": 3,
//     "run": 1,
//     "idle": 10
// }
// let boss = new Boss(80,player,actions);
// boss.update();