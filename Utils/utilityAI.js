import { Rect } from "./JudeUtils.js";
function calculateDistance(rect1, rect2) {
    const centerX1 = rect1.x + rect1.width / 2;
    const centerY1 = rect1.y + rect1.height / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    const centerY2 = rect2.y + rect2.height / 2;
    const dx = centerX2 - centerX1;
    const dy = centerY2 - centerY1;
    return Math.sqrt(dx * dx + dy * dy); // Euclidean distance
}
function determineGameState(health) {
    if (health > 50) return 'safe';
    if (health > 25) return 'warning';
    return 'risky'; // Health <= 40
}
function evaluateAction(action, factors) {
    let score = 0;

    switch (action) {
        case 'attack':
            if (factors.health > 50) {
                score += 5; // Base score for attacking with sufficient health
                if (factors.position === 'closeToEnemy') {
                    score += 10; // Bonus for attacking when close to the enemy
                }
            }
            break;

        case 'defend':
            if (factors.health < 50) {
                score += 10; // Base score for defending with low health
            }
            break;

        case 'run':
            if (factors.health < 30) {
                score += 15; // High score for running when health is critically low
                if (factors.position === 'closeToEnemy') {
                    score += 5; // Additional bonus for running when close to the enemy
                }
            }
            break;

        case 'idle':
            score = 1; // Minimal score for idling, representing a passive action
            break;

        default:
            console.warn(`Unknown action: ${action}`); // Log a warning for unknown actions
    }

    return Math.max(0, score); // Ensure the score is non-negative
}

export class UtilityAI {
    constructor(actionWeights) {
        this.actionWeights = actionWeights;
        this.actions = Object.keys(actionWeights); // Extract the action names from the weights
        this.timer = 10
    }

    update(factors) {
        this.timer += 0.1
        // Determine the position relative to the enemy
        const distance = calculateDistance(factors.characterPosition, factors.playerPosition);
        const closeDistanceThreshold = 25; // Example threshold for being 'closeToEnemy'

        // Set position factor based on distance
        factors.position = distance < closeDistanceThreshold ? 'closeToEnemy' : 'farFromEnemy';

        // Determine the game state based on health
        factors.gameState = determineGameState(factors.health);

        // Calculate the weighted score for each action
        const scores = this.actions.map(action => {
            const utilityScore = evaluateAction(action, factors);
            const weight = this.actionWeights[action] || 1; // Default weight to 1 if not defined
            return utilityScore * weight;
        });

        // Calculate the total score
        const totalScore = scores.reduce((sum, score) => sum + score, 0);

        if (totalScore === 0) return this.actions[0]; // Handle the case where all scores are zero

        // Select an action based on the weighted scores
        let randomValue = Math.random() * totalScore;
        let accumulatedScore = 0;

        for (let i = 0; i < this.actions.length; i++) {
            accumulatedScore += scores[i];
            if (randomValue < accumulatedScore) {
                if (this.timer > 15) {
                    this.timer = 0;
                    return this.actions[i];
                }
            }
        }
    }
}

// Example usage
// const actionWeights = {
//     "attack": 10, // Weight for 'attack'
//     "defend": 3, // Weight for 'defend'
//     "run": 1,    // Weight for 'run'
//     "idle": 3  // Weight for 'idle'
// };

// // Define positions using Rect
// const characterPosition = new Rect(10, 10, 10, 10); // Example position for character
// const playerPosition = new Rect(100, 20, 10, 10); // Example position for player

// const factors = {
//     health: 65, // Example health value (critically low)
//     characterPosition: characterPosition,
//     playerPosition: playerPosition,
//     position: '', // Will be set in the update method
//     gameState: '' // Will be set in the update method
// };

// // const bossAI = new UtilityAI(actionWeights);
// // const nextAction = bossAI.update(factors);
