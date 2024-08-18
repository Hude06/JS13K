// UtilityAI class with action weights
// UtilityAI class with action weights
function evaluateAction(action, factors) {
    let score = 0; // Initialize score to 0 for actions not explicitly handled

    // Check if the action is 'attack'
    if (action === 'attack') {
        // Increase score if health is above 50, indicating a strong offensive position
        if (factors.health > 50) {
            score += 5; // Base score for attacking with sufficient health
            // Further increase score if the character is close to the enemy
            if (factors.position === 'closeToEnemy') {
                score += 10; // Bonus for attacking when close to the enemy
            }
        }
    } 
    // Check if the action is 'defend'
    else if (action === 'defend') {
        // Increase score if health is below 40, suggesting a need for defense
        if (factors.health < 40) {
            score += 10; // Base score for defending with low health
            // Further increase score if the game state is considered risky
            if (factors.gameState === 'risky') {
                score += 5; // Bonus for defending during a risky game state
            }
        }
    } 
    // Check if the action is 'run'
    else if (action === 'run') {
        // Increase score if health is very low, indicating a need to escape
        if (factors.health < 30) {
            score += 15; // High score for running when health is critically low
        } 
        // Otherwise, increase score if the character is far from the enemy
        else if (factors.position === 'farFromEnemy') {
            score += 8; // Bonus for running when distant from enemies
        }
    } 
    // Handle unknown actions
    else {
        console.warn(`Unknown action: ${action}`); // Log a warning for unknown actions
    }

    // Ensure the score is non-negative before returning
    return Math.max(0, score); // Return the final score, ensuring it is not negative
}

class UtilityAI {
    constructor(actions, weights, evaluateAction) {
        this.actions = actions;
        this.weights = weights; // Action weights
        this.evaluateAction = evaluateAction;
    }

    // Choose an action based on the evaluation of current factors and weights
    update(factors) {
        // Create an array to store scores for each action
        let scores = [];
        
        // Calculate the score for each action
        for (let action of this.actions) {
            // Get the utility score for the action
            const utilityScore = this.evaluateAction(action, factors);
            // Apply the action weight
            const weightedScore = utilityScore * this.weights[action];
            // Add the weighted score to the scores array
            scores.push(weightedScore);
        }

        // Calculate the total score
        const totalScore = scores.reduce((sum, score) => sum + score, 0);

        // Randomly select an action based on the weighted scores
        let randomValue = Math.random() * totalScore;
        let accumulatedScore = 0;

        for (let i = 0; i < this.actions.length; i++) {
            accumulatedScore += scores[i];
            if (randomValue < accumulatedScore) {
                return this.actions[i];
            }
        }

        // Fallback: return the first action if something goes wrong
        return this.actions[0];
    }
}
const actions = ["attack", "defend", "run"];
const actionWeights = {
    "attack": 1, // Example weight for 'attack'
    "defend": 1, // Example weight for 'defend'
    "run": 5     // Example weight for 'run'
};
// Example usage
const factors = {
    health: 75,           // Boss's current health
    gameState: 'risky',   // Current game state
    position: 'closeToEnemy' // Boss's position relative to enemies
};

const bossAI = new UtilityAI(actions, actionWeights, evaluateAction);
const nextAction = bossAI.update(factors);
console.log(nextAction);
