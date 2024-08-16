export class ParticleEngine {
    constructor(ctx,  options) {
        this.ctx = ctx;
        this.color = options.color || 'white';
        this.size = options.size || 5;
        this.count = options.count || 10;
        this.duration = options.duration || 1; // in seconds
        this.particles = [];
        this.spawnParticles();
    }

    spawnParticles(x,y) {
        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 2 + 1;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: this.size,
                life: Math.random() * this.duration,
                maxLife: this.duration
            });
        }
    }

    update(deltaTime) {
        this.particles = this.particles.filter(particle => particle.life > 0);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= deltaTime;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.particles.forEach(particle => {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}