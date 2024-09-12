(() => {
  // Utils/JudeUtils.js
  var Point = class _Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    floor() {
      return new _Point(Math.floor(this.x), Math.floor(this.y));
    }
    add(x, y) {
      return new _Point(this.x + x, this.y + y);
    }
  };
  var Rect = class {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    intersects(otherRect) {
      return this.contains(new Point(otherRect.x, otherRect.y)) || this.contains(new Point(otherRect.x + otherRect.w, otherRect.y)) || this.contains(new Point(otherRect.x, otherRect.y + otherRect.h)) || this.contains(
        new Point(otherRect.x + otherRect.w, otherRect.y + otherRect.h)
      ) || otherRect.contains(new Point(this.x, this.y)) || otherRect.contains(new Point(this.x + this.w, this.y)) || otherRect.contains(new Point(this.x, this.y + this.h)) || otherRect.contains(new Point(this.x + this.w, this.y + this.h));
    }
    contains(pt) {
      return pt.x >= this.x && pt.x <= this.x + this.w && pt.y >= this.y && pt.y <= this.y + this.h;
    }
  };

  // Utils/particalEngine.js
  var ParticleEngine = class {
    constructor(ctx, options) {
      this.ctx = ctx;
      this.color = options.color || "white";
      this.size = options.size || 5;
      this.count = options.count || 10;
      this.duration = options.duration || 1;
      this.particles = [];
      this.spawnParticles();
    }
    spawnParticles(x, y) {
      for (let i = 0; i < this.count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 2 + 1;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: this.size,
          life: Math.random() * this.duration,
          maxLife: this.duration
        });
      }
    }
    update(deltaTime) {
      this.particles = this.particles.filter((particle) => particle.life > 0);
      this.particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= deltaTime;
      });
    }
    draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.particles.forEach((particle) => {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }
  };

  // Utils/globals.js
  var rowPattern = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0
  ];
  var FullEmptyRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var emptyRowLedge = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];
  var emptyRowLedgeOther = [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];
  var zzfxR = 44100;
  var GameLevel1 = [];
  var Intro = [
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    emptyRowLedge,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    FullEmptyRow,
    emptyRowLedgeOther,
    FullEmptyRow,
    FullEmptyRow,
    rowPattern,
    rowPattern
  ];
  var GameLevel1Options = {
    level: GameLevel1,
    tint: {
      r: 200,
      g: 200,
      b: 0
    },
    song: [[[, 0, 77, , , 0.7, 2, 0.41, , , , , , , , 0.06], [, 0, 43, 0.01, , 0.3, 2, , , , , , , , , 0.02, 0.01], [, 0, 170, 3e-3, , 8e-3, , 0.97, -35, 53, , , , , , 0.1], [0.8, 0, 270, , , 0.12, 3, 1.65, -2, , , , , 4.5, , 0.02], [, 0, 86, , , , , 0.7, , , , 0.5, , 6.7, 1, 0.05], [, 0, 41, , 0.05, 0.4, 2, 0, , , 9, 0.01, , , , 0.08, 0.02], [, 0, 2200, , , 0.04, 3, 2, , , 800, 0.02, , 4.8, , 0.01, 0.1], [0.3, 0, 16, , , 0.3, 3]], [[[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 22, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 24, , , , , , , , , , , , , , , , , , , , , , , , 22, , 22, , 22, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 24, , , , , , , , 27, , , , , , , , , , , , , , , , 27, , , , 24, , , , 24, , , , , , , , 27, , , , , , , , , , , , , , , , 24, , 24, , 24, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [6, 1, , , 34, 34, 34, , , , , , 34, 34, , , , , 34, , , , 34, 34, , , , , 34, , , , 34, , , , 34, 34, 34, , , , , , 34, , , , , , 34, 34, , , 34, 34, , , , , , , , , 34, 34], [4, 1, , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , , , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 23, 23, 35, 35, 23, 23, 35, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 36], [5, -1, 21, , , 19, , , 21, , , , , , , , , , 21, , , 19, , , 17, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,], [3, 1, 24, , , 24, , , 24, , , , , , , , , , 24, , , 24, , , 24, , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [4, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, 24.01, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 23, , 21, 23, , 35, , 23, , 21, 23, , 35, , 35, , 23, , 21, 23, , 35, , 21, 23, , 35, , 21, 23, , ,], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, 36, 34, , 33, 34, 34, 36, 31, 36, 34, , 31, 34, 32, , 33, 36, 34, , 31, 34, 34, 36, 33, 36, 33, , 31, , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, , , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29], [2, 1, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , , , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , ,], [6, 1, , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , , , , , , , , , , , 36, , , , , , 36, , 36, , , , , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , 25, , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25]], [[1, -1, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 31], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 36, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 19, , 19, 19, 31, 19, 19, 31, 19, , 19, 19, 31, 19, 19, 31], [2, 1, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , , , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, , , , , , 34, , 34, , , , , , , , 34, , , , , , 34, , 34, , , , , ,]]], [0, 1, 1, 2, 3, 4, 4], , { "title": "Depp", "Notes": "Unknown author" }]
  };
  var IntroOptions = {
    level: Intro,
    tint: {
      r: 255,
      g: 0,
      b: 0
    },
    song: [[[, 0, 77, , , 0.7, 2, 0.41, , , , , , , , 0.06], [, 0, 43, 0.01, , 0.3, 2, , , , , , , , , 0.02, 0.01], [, 0, 170, 3e-3, , 8e-3, , 0.97, -35, 53, , , , , , 0.1], [0.8, 0, 270, , , 0.12, 3, 1.65, -2, , , , , 4.5, , 0.02], [, 0, 86, , , , , 0.7, , , , 0.5, , 6.7, 1, 0.05], [, 0, 41, , 0.05, 0.4, 2, 0, , , 9, 0.01, , , , 0.08, 0.02], [, 0, 2200, , , 0.04, 3, 2, , , 800, 0.02, , 4.8, , 0.01, 0.1], [0.3, 0, 16, , , 0.3, 3]], [[[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 22, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 24, , , , , , , , , , , , , , , , , , , , , , , , 22, , 22, , 22, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33], [3, 1, 24, , , , , , , , 27, , , , , , , , , , , , , , , , 27, , , , 24, , , , 24, , , , , , , , 27, , , , , , , , , , , , , , , , 24, , 24, , 24, , , ,], [5, -1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [, 1, 21, , , , , , , , , , , , , , , , , , , , , , , , , , , , 24, , , , 23, , , , , , , , , , , , , , , , , , , , , , , , 24, , 23, , 21, , , ,], [6, 1, , , 34, 34, 34, , , , , , 34, 34, , , , , 34, , , , 34, 34, , , , , 34, , , , 34, , , , 34, 34, 34, , , , , , 34, , , , , , 34, 34, , , 34, 34, , , , , , , , , 34, 34], [4, 1, , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , , , , , , , , 24, , , , , , 24, , 24, , , , 24, , , , 24, , , , , , , , , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 23, 23, 35, 35, 23, 23, 35, 23, 23, 35, 23, 23, 36, 23, 23, 35, 23, 23, 36, 36], [5, -1, 21, , , 19, , , 21, , , , , , , , , , 21, , , 19, , , 17, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,], [3, 1, 24, , , 24, , , 24, , , , , , , , , , 24, , , 24, , , 24, , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [4, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , 24.75, 24.5, 24.26, 24.01, 24.01, 24.01, 24.01, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 23, , 21, 23, , 35, , 23, , 21, 23, , 35, , 35, , 23, , 21, 23, , 35, , 21, 23, , 35, , 21, 23, , ,], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, 36, 34, , 33, 34, 34, 36, 31, 36, 34, , 31, 34, 32, , 33, 36, 34, , 31, 34, 34, 36, 33, 36, 33, , 31, , ,]], [[1, -1, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 21, 21, 33, 33, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, , , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 21, , 19, 21, , 33, , 21, , 19, 21, , 33, , 33, , 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29], [2, 1, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , , , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, 34, 34, , 34, , ,], [6, 1, , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , 36, , 36, , , , , , , , 36, , , , , , , , , , , , , , , , 36, , , , , , 36, , 36, , , , , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , 25, , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25]], [[1, -1, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 14, 14, 26, 26, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 17, 17, 29, 29, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 19, 19, 31, 31], [4, 1, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 36, , 24, 24, , 24, 24, , 24, 24, 24, 24, , 24, 24, , 24, 24], [7, -1, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 14, , 14, 14, 26, 14, 14, 26, 17, , 17, 17, 29, 17, 17, 29, 17, , 17, 17, 29, 17, 17, 29, 19, , 19, 19, 31, 19, 19, 31, 19, , 19, 19, 31, 19, 19, 31], [2, 1, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , , , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, 36, 36, , 36, , ,], [3, 1, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25, , , , , 25, , , , , , , , 25, , , , , , , , 25, , , , , , , , 25, 25, 25, 25], [6, 1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 34, , , , , , 34, , 34, , , , , , , , 34, , , , , , 34, , 34, , , , , ,]]], [0, 1, 1, 2, 3, 4, 4], , { "title": "Depp", "Notes": "Unknown author" }]
  };
  var Globals = class {
    constructor() {
      this.boss = [];
      this.currentKey = /* @__PURE__ */ new Map();
      this.mobsLeft = 0;
      this.blocks = [];
      this.SCROLLX = 200;
      this.debug = false;
      this.SCROLLY = 0;
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.bullets = [];
      this.mouseClicked = false;
      this.debugBlocks = [];
      this.enemys = [];
      this.mouseX = 0;
      this.mouseY = 0;
      this.PlayerToBig = false;
      this.kills = 0;
      this.BLOCKSIZE = 32;
      this.currentScreen = "splash";
      this.type_distance = 0;
      this.flicking = 0;
      this.currentUrl = window.location.href;
      this.baseUrl = new URL(this.currentUrl).origin;
      this.timePlayed = 0;
      this.navKey = /* @__PURE__ */ new Map();
      this.currentLevel = null;
      this.particleEngine = new ParticleEngine(this.ctx, {
        color: "red",
        size: 3,
        count: 100,
        duration: 0.5
        // 2 seconds
      });
      this.GameLevel1Options = GameLevel1Options;
      this.IntroOptions = IntroOptions;
      this.zzfx = (...t) => this.zzfxP(this.zzfxG(...t));
      this.zzfxP = (...t) => {
        let e = zzfxX.createBufferSource(), f = zzfxX.createBuffer(t.length, t[0].length, zzfxR);
        t.map((d, i) => f.getChannelData(i).set(d)), e.buffer = f, e.connect(zzfxX.destination), e.start();
        return e;
      };
      this.zzfxG = (q = 1, k = 0.05, c = 220, e = 0, t = 0, u = 0.1, r = 0, F = 1, v = 0, z = 0, w = 0, A = 0, l = 0, B = 0, x = 0, G = 0, d = 0, y = 1, m = 0, C = 0) => {
        let b = 2 * Math.PI, H = v *= 500 * b / zzfxR ** 2, I = (0 < x ? 1 : -1) * b / 4, D = c *= (1 + 2 * k * Math.random() - k) * b / zzfxR, Z = [], g = 0, E = 0, a = 0, n = 1, J = 0, K = 0, f = 0, p, h;
        e = 99 + zzfxR * e;
        m *= zzfxR;
        t *= zzfxR;
        u *= zzfxR;
        d *= zzfxR;
        z *= 500 * b / zzfxR ** 3;
        x *= b / zzfxR;
        w *= b / zzfxR;
        A *= zzfxR;
        l = zzfxR * l | 0;
        for (h = e + m + t + u + d | 0; a < h; Z[a++] = f) ++K % (100 * G | 0) || (f = r ? 1 < r ? 2 < r ? 3 < r ? Math.sin((g % b) ** 3) : Math.max(Math.min(Math.tan(g), 1), -1) : 1 - (2 * g / b % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(g / b) - g / b) : Math.sin(g), f = (l ? 1 - C + C * Math.sin(2 * Math.PI * a / l) : 1) * (0 < f ? 1 : -1) * Math.abs(f) ** F * q * zzfxV * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - y) : a < e + m + t ? y : a < h - d ? (h - a - d) / u * y : 0), f = d ? f / 2 + (d > a ? 0 : (a < h - d ? 1 : (h - a) / d) * Z[a - d | 0] / 2) : f), p = (c += v += z) * Math.sin(E * x - I), g += p - p * B * (1 - 1e9 * (Math.sin(a) + 1) % 2), E += p - p * B * (1 - 1e9 * (Math.sin(a) ** 2 + 1) % 2), n && ++n > A && (c += w, D += w, n = 0), !l || ++J % l || (c = D, v = H, n = n || 1);
        return Z;
      };
      this.zzfxV = 0.3;
      this.zzfxX = new (window.AudioContext || webkitAudioContext)();
      this.zzfxM = (n, f, t, e = 125) => {
        let l, o, z, r, g, h, x, a, u, c, d, i, m, p, G, M = 0, R = [], b = [], j = [], k = 0, q = 0, s = 1, v = {}, w = zzfxR / e * 60 >> 2;
        for (; s; k++) R = [s = a = d = m = 0], t.map((e2, d2) => {
          for (x = f[e2][k] || [0, 0, 0], s |= !!f[e2][k], G = m + (f[e2][0].length - 2 - !a) * w, p = d2 == t.length - 1, o = 2, r = m; o < x.length + p; a = ++o) {
            for (g = x[o], u = o == x.length + p - 1 && p || c != (x[0] || 0) | g | 0, z = 0; z < w && a; z++ > w - 99 && u ? i += (i < 1) / 99 : 0) h = (1 - i) * R[M++] / 2 || 0, b[r] = (b[r] || 0) - h * q + h, j[r] = (j[r++] || 0) + h * q + h;
            g && (i = g % 1, q = x[1] || 0, (g |= 0) && (R = v[[c = x[M = 0] || 0, g]] = v[[c, g]] || (l = [...n[c]], l[2] *= 2 ** ((g - 12) / 12), g > 0 ? this.zzfxG(...l) : [])));
          }
          m = G;
        });
        return [b, j];
      };
    }
    reset() {
      location.reload();
    }
  };
  var zzfxV = 0.3;
  var zzfxX = new AudioContext();
  var zzfx = (
    // play sound
    (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, N = 0) => {
      let M = Math, d = 2 * M.PI, R = 44100, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, h = N < 0 ? -1 : 1, x = d * h * N * 2 / R, L = M.cos(x), Z = M.sin, K = Z(x) / 4, O = 1 + K, X = -2 * L / O, Y = (1 - K) / O, P = (1 + h * L) / 2 / O, Q = -(h + L) / O, S = P, T = 0, U = 0, V = 0, W = 0;
      e = R * e + 9;
      m *= R;
      r *= R;
      t *= R;
      c *= R;
      y *= 500 * d / R ** 3;
      A *= d / R;
      v *= d / R;
      z *= R;
      l = R * l | 0;
      p *= zzfxV;
      for (h = e + m + r + t + c | 0; a < h; k[a++] = f * p) ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? Z(g ** 3) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : Z(g), f = (l ? 1 - B + B * Z(d * a / l) : 1) * (f < 0 ? -1 : 1) * M.abs(f) ** D * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2 / p) : f, N ? f = W = S * T + Q * (T = U) + P * (U = f) - Y * V - X * (V = W) : 0), x = (b += u += y) * M.cos(A * H++), g += x + x * E * Z(a ** 5), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1);
      p = zzfxX.createBuffer(1, h, R);
      p.getChannelData(0).set(k);
      b = zzfxX.createBufferSource();
      b.buffer = p;
      b.connect(zzfxX.destination);
      b.start();
    }
  );

  // Utils/font.js
  var Text = class {
    constructor(text, x, y, size, typing_speed, AmFlickering) {
      this.speed = typing_speed;
      this.distance = -0.1;
      this.text = text;
      this.x = x;
      this.y = y;
      this.size = size;
      this.AmFlickering = AmFlickering;
      this.flicking = 0;
    }
    startTyping() {
      this.distance += this.speed / 100;
    }
    draw() {
      let ctx = globals.ctx;
      const font = new Image();
      font.src = "./WhiteFont.png";
      for (let t = 0; t < this.text.length; t++) {
        if (t > this.distance) {
          break;
        }
        let newText = this.text[t].toLowerCase();
        let char = newText;
        let charX = 0;
        if (getIndex(char) !== null) {
          charX = getIndex(char);
        }
        let charY = 0;
        if (this.AmFlickering) {
          this.flicking += 0.1;
          if (this.flicking > 10) {
            ctx.drawImage(font, charX * 5 - 5 - 0.1, charY * 5, 5, 5, this.x + t * this.size, this.y + 3, this.size, this.size);
            setTimeout(() => {
              this.flicking = 0;
            }, 1e3);
          }
        } else {
          ctx.drawImage(font, charX * 5 - 5 - 0.1, charY * 5, 5, 5, this.x + t * this.size, this.y + 3, this.size, this.size);
        }
      }
    }
  };
  function getIndex(char) {
    if (char >= "a" && char <= "z") {
      return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
    } else if (char >= "0" && char <= "9") {
      return char.charCodeAt(0) - "0".charCodeAt(0) + 27;
    } else {
      return null;
    }
  }

  // Characters/player.js
  var Bullet = class {
    constructor(gunSpeed, directionX, x, y) {
      this.visible = true;
      this.speed = gunSpeed;
      this.x = x;
      this.y = y;
      this.w = 5;
      this.h = 5;
      this.directionX = directionX;
    }
    update(ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.w, this.h);
      this.x += this.directionX * this.speed;
    }
  };
  var Gun = class {
    constructor(direction, x, y, player2) {
      this.timeLeft = 0;
      this.gunSpeed = 10;
      this.direction = direction;
      this.pos = new Point(x, y);
      this.width = 40;
      this.height = 10;
      this.angle = 10;
      this.directionX = 0;
      this.player = player2;
      this.damage = 15;
    }
    shoot() {
      if (this.player.bulletsLeft > 0) {
        if (this.timeLeft <= 0) {
          this.player.bulletsLeft -= 1;
          zzfx(...[2.04, , 475, 0.01, 0.03, 0.06, 4, 1.9, -8.7, , , , 0.09, , 36, 0.2, 0.17, 0.67, 0.04]);
          this.directionX = Math.cos(this.angle);
          this.directionY = Math.sin(this.angle);
          globals.bullets.push(new Bullet(this.gunSpeed, this.directionX, this.pos.x, this.pos.y));
          this.timeLeft = 10;
        }
      } else {
        if (globals.currentScreen !== "intro") {
          globals.PlayerToBig = true;
        }
      }
    }
    update(direction, x, y) {
      this.pos.x = x;
      this.pos.y = y;
      this.directionX = direction;
      this.timeLeft -= 0.5;
      if (direction > 0) {
        this.angle = 0;
      } else if (direction < 0) {
        this.angle = Math.PI;
      }
    }
  };
  var Player = class {
    constructor() {
      this.bounds = new Rect(700, 500, 30, 30);
      this.animator = new Point(0, 0);
      this.gravity = 0.27;
      this.Yvelocity = 0;
      this.Xvelocity = 0;
      this.speed = 2;
      this.friction = 0.75;
      this.jumpHeight = 5;
      this.grounded = false;
      this.timeLeft = 0;
      this.maxSpeed = 2;
      this.isGrounded = false;
      this.ableToJump = false;
      this.gun = new Gun(this.Xvelocity, this.bounds.x, this.bounds.y, this);
      this.image = new Image();
      this.image.src = "../Assets/Player-Sheet.png";
      this.frameRate = 60;
      this.frames = 0;
      this.health = 3;
      this.bulletsLeft = 13;
      this.moveable = true;
      this.bulletsText = new Text("Bullets - ", 75 + globals.SCROLLX, 75, 25, 500, false);
    }
    reset() {
      this.bounds = new Rect(700, 500, 30, 30);
      this.animator = new Point(0, 0);
      this.gravity = 0.27;
      this.Yvelocity = 0;
      this.Xvelocity = 0;
      this.speed = 2;
      this.friction = 0.75;
      this.jumpHeight = 5;
      this.grounded = false;
      this.timeLeft = 0;
      this.maxSpeed = 2;
      this.isGrounded = false;
      this.ableToJump = false;
      this.gun = new Gun(this.Xvelocity, this.bounds.x, this.bounds.y, this);
      this.image = new Image();
      this.image.src = "../Assets/Player-Sheet.png";
      this.frameRate = 60;
      this.frames = 0;
      this.health = 3;
      this.bulletsLeft = 13;
      this.moveable = true;
      this.bulletsText = new Text("Bullets - ", 75 + globals.SCROLLX, 10, 25, 500, false);
      console.log("RESET", this.gravity, this.Xvelocity, this.Yvelocity);
    }
    grow() {
      this.moveable = false;
      this.bounds.x = 700 - this.bounds.w / 2;
      this.bounds.y = 500 - this.bounds.h / 2;
      this.bounds.w += 0.12;
      this.bounds.h += 0.12;
      setTimeout(() => {
        if (this.bulletsLeft < 13) {
          this.grow();
        }
      }, 75);
    }
    draw(ctx) {
      if (Math.round(this.Xvelocity) !== 0) {
        this.animate();
      }
      ctx.save();
      globals.ctx.filter = `grayscale(${100 - this.bulletsLeft * 7.69}%)`;
      this.gun.update(this.Xvelocity, this.bounds.x, this.bounds.y + 12);
      ctx.fillStyle = "red";
      if (this.Xvelocity > 0) {
        ctx.drawImage(this.image, this.animator.x, this.animator.y, 16, 16, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
      } else {
        ctx.save();
        ctx.scale(-1, 1);
        const flippedX = -this.bounds.x - this.bounds.w;
        ctx.drawImage(this.image, this.animator.x, this.animator.y, 16, 16, flippedX, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.restore();
      }
      if (globals.debug) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
      }
      ctx.restore();
      ctx.fillStyle = "red";
      ctx.fillRect(75 + globals.SCROLLX, 50, this.health * 50, 20);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.strokeRect(75 + globals.SCROLLX, 50, 150, 20);
      this.bulletsText.x = 75 + globals.SCROLLX;
      this.bulletsText.text = "Bullets " + this.bulletsLeft;
      this.bulletsText.draw();
      this.bulletsText.startTyping();
    }
    animate() {
      this.frames += this.frameRate;
      if (this.frames > 500) {
        this.animator.x = 16;
        if (this.frames > 1e3) {
          this.frames = 0;
        }
      } else {
        this.animator.x = 0;
      }
    }
    knockback(Xvelocity) {
      if (Math.round(Xvelocity) == 0) {
        this.Xvelocity += this.speed * 30;
        this.jump(10);
      } else {
        this.Xvelocity += this.speed * 30;
        this.jump(10);
      }
    }
    jump(h) {
      const savedJumped = this.jumpHeight;
      if (h) {
        this.jumpHeight = h;
      }
      this.Yvelocity = -this.jumpHeight - 2;
      this.grounded = false;
      this.bounds.y -= 5;
      this.jumpHeight = savedJumped;
    }
    collision() {
      for (let i = 0; i < globals.enemys.length; i++) {
        if (this.bounds.intersects(globals.enemys[i].bounds) || globals.enemys[i].bounds.intersects(this.bounds)) {
          this.health -= 0.25;
          zzfx(...[1.98, , 523, 0.01, 0.01, 0.07, 2, 1.9, -8.7, , , , 0.09, , 36, 0.2, 0.17, 0.67, 0.04]);
          this.knockback(this.Xvelocity);
        }
        if (this.bounds.intersects(globals.boss.bounds) || globals.boss.bounds.intersects(this.bounds)) {
          this.health -= 0.25;
          zzfx(...[1.98, , 523, 0.01, 0.01, 0.07, 2, 1.9, -8.7, , , , 0.09, , 36, 0.2, 0.17, 0.67, 0.04]);
          this.knockback(this.Xvelocity);
        }
      }
    }
    update(currentKey, level) {
      this.timeLeft -= 0.5;
      this.Xvelocity *= this.friction;
      if (this.Xvelocity > this.maxSpeed) {
        this.Xvelocity = this.maxSpeed;
      }
      if (this.Xvelocity < -this.maxSpeed) {
        this.Xvelocity = -this.maxSpeed;
      }
      const tileX = Math.floor(this.bounds.x / globals.BLOCKSIZE);
      const tileY = Math.floor(this.bounds.y / globals.BLOCKSIZE);
      const tileIndex = new Point(tileX, tileY);
      const right_tile1 = level.get(tileIndex.add(1, 0));
      const right_tile2 = level.get(tileIndex.add(1, 1));
      const left_tile1 = level.get(tileIndex.add(0, 0));
      const left_tile2 = level.get(tileIndex.add(0, 1));
      const bottom1 = level.get(tileIndex.add(0, 1));
      const bottom2 = level.get(tileIndex.add(1, 1));
      globals.debugBlocks.push(right_tile1);
      globals.debugBlocks.push(right_tile2);
      globals.debugBlocks.push(left_tile1);
      globals.debugBlocks.push(left_tile2);
      globals.debugBlocks.push(bottom1);
      globals.debugBlocks.push(bottom2);
      if (right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
        this.bounds.x = tileIndex.x * globals.BLOCKSIZE;
        this.Xvelocity = 0;
        this.isGrounded = bottom1.WHATBlockAmI == 1;
      } else if (left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
        this.bounds.x = (tileIndex.x + 1) * globals.BLOCKSIZE;
        this.Xvelocity = 0;
        this.isGrounded = bottom2.WHATBlockAmI == 1;
      } else {
        this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
      }
      if (this.isGrounded) {
        this.grounded = true;
        this.Yvelocity = 0;
        this.ableToJump = true;
        this.bounds.y = tileIndex.y * globals.BLOCKSIZE;
      } else {
        this.grounded = false;
        if (this.moveable) {
          this.applyGravity();
        }
      }
      if (!this.isGrounded) {
        if (right_tile1.WHATBlockAmI == 1 || right_tile2.WHATBlockAmI == 1) {
          this.Yvelocity = 2;
        }
      }
      if (globals.mouseClicked || globals.currentKey.get("e")) {
        this.gun.shoot();
      }
      if (this.moveable) {
        this.handleMovement(currentKey);
      }
      this.bounds.x += this.Xvelocity;
      this.collision();
      if (this.health <= 0) {
        zzfx(...[2, , 727, 0.01, 0.03, 0.53, 3, 1.39, 0.9, 0.1, , , , 1.9, -44, 0.4, 0.39, 0.31, 0.12]);
        globals.currentScreen = "end";
      }
    }
    handleMovement(currentKey) {
      if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
        this.Xvelocity -= this.speed;
      }
      if (currentKey.get("d") || currentKey.get("ArrowRight")) {
        this.Xvelocity += this.speed;
      }
      if ((currentKey.get(" ") || currentKey.get("ArrowUp") || currentKey.get("w")) && this.ableToJump && this.grounded) {
        this.jump();
      }
    }
    applyGravity() {
      this.Yvelocity += this.gravity;
      this.bounds.y += this.Yvelocity;
    }
  };

  // Utils/level.js
  var Block = class {
    constructor(x, y, WHATBlockAmI) {
      this.bounds = new Rect(x, y, globals.BLOCKSIZE, globals.BLOCKSIZE);
      this.tileSet = new Image();
      this.tileSet.src = "./Tileset.png";
      this.WHATBlockAmI = WHATBlockAmI;
    }
    draw(ctx, r, g, b) {
      if (this.WHATBlockAmI == 1) {
        ctx.drawImage(this.tileSet, 32, 8, 8, 8, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
        ctx.restore();
      }
    }
  };
  var Level = class {
    constructor(b, l, o, id) {
      this.width;
      this.height;
      this.blocks = b;
      this.level = l;
      this.x = 1;
      this.y = 1;
      this.options = o;
      this.id = id;
    }
    get(tileIndex) {
      let x = tileIndex.x;
      let y = tileIndex.y;
      for (let block of this.blocks) {
        if (block.bounds.x === x * globals.BLOCKSIZE && block.bounds.y === y * globals.BLOCKSIZE) {
          return block;
        }
      }
      return null;
    }
    init() {
      console.log("Level is", this.id);
      this.height = this.level.length;
      this.width = this.level[0].length;
      for (let i = 0; i < this.level.length; i++) {
        for (let w = 0; w < this.level[i].length; w++) {
          let block = this.level[i][w];
          this.x = w;
          this.y = i;
          this.blocks.push(new Block(this.x * globals.BLOCKSIZE, this.y * globals.BLOCKSIZE, block));
        }
      }
    }
  };

  // Characters/enemy.js
  var Enemy = class {
    constructor(follow, src) {
      this.bounds = new Rect(Math.random() * 1e3 + 100, 500, 40, 40);
      this.gravity = 0.27;
      this.Yvelocity = 0;
      this.Xvelocity = 0;
      this.speed = 0.75;
      this.jumpHeight = 3;
      this.grounded = false;
      this.player = follow;
      this.sprite = new Image();
      this.sprite.src = src;
      this.alive = true;
    }
    update(level) {
      if (!this.alive) {
        globals.enemys.splice(globals.enemys.indexOf(this), 1);
      }
      for (let i = 0; i < globals.bullets.length; i++) {
        let bulletBounds = new Rect(globals.bullets[i].x, globals.bullets[i].y, globals.bullets[i].w, globals.bullets[i].h);
        if (bulletBounds.intersects(this.bounds) || this.bounds.intersects(bulletBounds)) {
          globals.bullets.splice(i, 1);
          this.alive = false;
          globals.mobsLeft -= 1;
          globals.kills += 1;
        }
      }
      this.bounds.y += this.Yvelocity;
      this.bounds.x += this.Xvelocity;
      const tileX = Math.floor(this.bounds.x / globals.BLOCKSIZE);
      const tileY = Math.floor(this.bounds.y / globals.BLOCKSIZE);
      const tileIndex = new Point(tileX, tileY);
      const tileContents = level.get(tileIndex);
      const right_tile1 = level.get(tileIndex.add(1, 0));
      const right_tile2 = level.get(tileIndex.add(1, 1));
      const left_tile1 = level.get(tileIndex.add(0, 0));
      const left_tile2 = level.get(tileIndex.add(0, 1));
      let bottom1 = level.get(tileIndex.add(0, 1));
      const bottom2 = level.get(tileIndex.add(1, 1));
      if (right_tile1.WHATBlockAmI == 1 && right_tile2.WHATBlockAmI == 1) {
        this.bounds.x = tileIndex.x * globals.BLOCKSIZE;
        this.Xvelocity = 0;
        this.isGrounded = bottom1.WHATBlockAmI == 1;
      } else if (left_tile1.WHATBlockAmI == 1 && left_tile2.WHATBlockAmI == 1) {
        this.bounds.x = (tileIndex.x + 1) * globals.BLOCKSIZE;
        this.Xvelocity = 0;
        this.isGrounded = bottom2.WHATBlockAmI == 1;
      } else {
        this.isGrounded = bottom1.WHATBlockAmI == 1 || bottom2.WHATBlockAmI == 1;
      }
      if (this.isGrounded) {
        this.grounded = true;
        this.Yvelocity = 0;
        this.ableToJump = true;
        this.bounds.y = tileIndex.y * globals.BLOCKSIZE;
      } else {
        this.grounded = false;
        this.applyGravity();
      }
      this.followPlayer();
      if (this.bounds.y > this.player.bounds.y) {
        this.jump();
      }
    }
    followPlayer() {
      const randomnessFactor = 5;
      if (this.player.bounds.x > this.bounds.x) {
        this.Xvelocity = this.speed + (Math.random() * randomnessFactor - randomnessFactor / 2);
      } else {
        this.Xvelocity = -this.speed + (Math.random() * randomnessFactor - randomnessFactor / 2);
      }
    }
    applyGravity() {
      this.Yvelocity += this.gravity;
    }
    jump() {
      if (this.grounded) {
        this.Yvelocity -= this.jumpHeight;
        this.grounded = false;
      }
    }
    draw() {
      if (globals.debug == true) {
        globals.ctx.strokeStyle = "red";
        globals.ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
      }
      if (this.Xvelocity < 0) {
        globals.ctx.drawImage(this.sprite, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
      } else {
        globals.ctx.save();
        globals.ctx.scale(-1, 1);
        const flippedX = -this.bounds.x - this.bounds.w;
        globals.ctx.drawImage(this.sprite, flippedX, this.bounds.y, this.bounds.w, this.bounds.h);
        globals.ctx.restore();
      }
    }
  };

  // Utils/utilityAI.js
  function calculateDistance(rect1, rect2) {
    const centerX1 = rect1.x + rect1.width / 2;
    const centerY1 = rect1.y + rect1.height / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    const centerY2 = rect2.y + rect2.height / 2;
    const dx = centerX2 - centerX1;
    const dy = centerY2 - centerY1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function determineGameState(health) {
    if (health > 50) return "safe";
    if (health > 25) return "warning";
    return "risky";
  }
  function evaluateAction(action, factors) {
    let score = 0;
    switch (action) {
      case "attack":
        if (factors.health > 50) {
          score += 5;
          if (factors.position === "closeToEnemy") {
            score += 10;
          }
        }
        break;
      case "defend":
        if (factors.health < 50) {
          score += 10;
        }
        break;
      case "run":
        if (factors.health < 30) {
          score += 15;
          if (factors.position === "closeToEnemy") {
            score += 5;
          }
        }
        break;
      case "idle":
        score = 1;
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
    return Math.max(0, score);
  }
  var UtilityAI = class {
    constructor(actionWeights) {
      this.actionWeights = actionWeights;
      this.actions = Object.keys(actionWeights);
      this.timer = 10;
    }
    update(factors) {
      this.timer += 0.1;
      const distance = calculateDistance(factors.characterPosition, factors.playerPosition);
      const closeDistanceThreshold = 25;
      factors.position = distance < closeDistanceThreshold ? "closeToEnemy" : "farFromEnemy";
      factors.gameState = determineGameState(factors.health);
      const scores = this.actions.map((action) => {
        const utilityScore = evaluateAction(action, factors);
        const weight = this.actionWeights[action] || 1;
        return utilityScore * weight;
      });
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      if (totalScore === 0) return this.actions[0];
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
  };

  // Utils/boss.js
  function spawnEnemy(player2, e) {
    let newE = e.toLowerCase();
    if (newE == "chicken" || newE == "duck") {
      globals.enemys.push(new Enemy(player2, "./Duck.png"));
      globals.mobsLeft += 1;
    }
    if (newE == "baby chicken" || newE == "baby duck") {
      globals.enemys.push(new Enemy(player2, "./BabyDuck.png"));
      globals.mobsLeft += 1;
    }
  }
  var Boss = class {
    constructor(health, player2, actions2) {
      this.bounds = new Rect(0, 150, 100, 100);
      this.speed = 1;
      this.actions = actions2;
      this.Velocity = new Point(0, 0);
      this.gravity = 0.2;
      this.image = new Image();
      this.image.src = "./BabyDuck.png";
      this.factors = {
        health,
        characterPosition: this.bounds,
        playerPosition: player2.bounds,
        position: "",
        // Will be set in the update method
        gameState: ""
        // Will be set in the update method
      };
      this.ableToAttack = false;
      setTimeout(() => {
        this.ableToAttack = true;
      }, 3e3);
      this.ai = new UtilityAI(this.actions);
      this.player = player2;
      this.alive = true;
      this.isGrounded = false;
      this.currentAction = null;
    }
    knockBack() {
      if (this.Velocity.x > 0) {
        this.bounds.x -= this.speed * 50;
      } else {
        this.bounds.x += this.speed * 50;
      }
    }
    draw() {
      if (this.alive) {
        globals.ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
      }
    }
    update(level) {
      const BASE_COOLDOWN = 1e4;
      const MIN_COOLDOWN = 1e3;
      if (this.ableToAttack) {
        spawnEnemy(this.player, "baby duck");
        this.ableToAttack = false;
        let cooldownPeriod = BASE_COOLDOWN - globals.timePlayed * 100;
        cooldownPeriod = Math.max(cooldownPeriod, MIN_COOLDOWN);
        setTimeout(() => {
          this.ableToAttack = true;
        }, cooldownPeriod);
      }
      if (this.factors.health <= 0) {
        this.alive = false;
        return;
      }
      if (this.alive) {
        this.bounds.x += this.Velocity.x;
        if (this.Velocity.x > this.speed) {
          this.Velocity.x = this.speed - 0.1;
        }
        if (this.Velocity.x < -this.speed) {
          this.Velocity.x = -this.speed + 0.1;
        }
        const tileX = Math.floor((this.bounds.x + this.bounds.w / 2) / globals.BLOCKSIZE);
        const tileY = Math.floor(this.bounds.y / globals.BLOCKSIZE);
        const tileIndex = new Point(tileX, tileY);
        const right_tile1 = level.get(tileIndex.add(1, 0));
        const right_tile2 = level.get(tileIndex.add(1, 1));
        const left_tile1 = level.get(tileIndex.add(0, 0));
        const left_tile2 = level.get(tileIndex.add(0, 1));
        let bottomTiles = [];
        const numRows = Math.floor(this.bounds.h / (globals.BLOCKSIZE - 5));
        const numCols = Math.floor(this.bounds.w / (globals.BLOCKSIZE - 5));
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            bottomTiles.push(level.get(tileIndex.add(j - 1, i + 1)));
          }
        }
        for (let i = 0; i < bottomTiles.length; i++) {
          globals.debugBlocks.push(bottomTiles[i]);
        }
        this.isGrounded = false;
        if (right_tile1 && right_tile1.WHATBlockAmI === 1 && right_tile2 && right_tile2.WHATBlockAmI === 1) {
          this.bounds.x = (tileIndex.x - 2) * globals.BLOCKSIZE;
          this.Velocity.x = 0;
        } else if (left_tile1 && left_tile1.WHATBlockAmI === 1 && left_tile2 && left_tile2.WHATBlockAmI === 1) {
          this.bounds.x = (tileIndex.x + 1) * globals.BLOCKSIZE;
          this.Velocity.x = 0;
        } else {
          for (let tile of bottomTiles) {
            if (tile.WHATBlockAmI !== 0) {
              this.isGrounded = true;
            }
          }
        }
        if (this.currentAction) {
          this.currentAction();
        }
        if (this.isGrounded) {
          this.bounds.y = Math.floor(this.bounds.y / globals.BLOCKSIZE) * globals.BLOCKSIZE;
          this.Velocity.y = 0;
          this.ableToJump = true;
        } else {
          this.applyGravity();
        }
        this.factors.characterPosition = this.bounds;
        this.factors.playerPosition = this.player.bounds;
        let action = this.ai.update(this.factors);
        if (action === "attack") {
          this.currentAction = this.attack;
        } else if (action === "defend") {
          this.currentAction = this.defend;
        } else if (action === "run") {
          this.currentAction = this.runAway;
        } else if (action === "idle") {
          this.currentAction = this.idle;
        }
        this.collision();
      }
    }
    hit(n) {
      this.factors.health -= n;
      this.knockBack();
      globals.mobsLeft -= 1;
    }
    collision() {
      for (let i = 0; i < globals.bullets.length; i++) {
        let bulletRect = new Rect(globals.bullets[i].x, globals.bullets[i].y, globals.bullets[i].w, globals.bullets[i].h);
        if (this.bounds.intersects(bulletRect) || bulletRect.intersects(this.bounds)) {
          this.hit(this.player.gun.damage);
          globals.bullets.splice(i, 1);
        }
      }
    }
    applyGravity() {
      this.Velocity.y += this.gravity;
      this.bounds.y += this.Velocity.y;
    }
    attack() {
      if (this.player.bounds.x > this.bounds.x) {
        this.Velocity.x += this.speed;
      } else {
        this.Velocity.x -= this.speed;
      }
    }
    defend() {
      console.log("Defend");
    }
    runAway() {
      console.log("Run away");
      if (this.bounds.x > this.player.bounds.x) {
        this.Velocity.x += this.speed;
      } else {
        this.Velocity.x -= this.speed;
      }
    }
    idle() {
      console.log("Do nothing");
    }
  };

  // main.js
  var globals = new Globals();
  var player = new Player();
  var actions = {
    "attack": 15,
    "defend": 10,
    "run": 5,
    "idle": 4
  };
  var boss = new Boss(100, player, actions);
  globals.boss = boss;
  globals.mobsLeft += 1;
  globals.canvas.addEventListener("mousedown", (_) => {
    globals.mouseClicked = true;
  });
  globals.canvas.addEventListener("mouseup", (_) => {
    globals.mouseClicked = false;
  });
  globals.canvas.addEventListener("mousemove", (e) => {
    globals.mouseX = e.clientX;
    globals.mouseY = e.clientY;
  });
  var intro = new Level(globals.blocks, globals.IntroOptions.level, globals.IntroOptions, "intro");
  var level1 = new Level(globals.blocks, globals.GameLevel1Options.level, globals.GameLevel1Options, "level1");
  console.log(globals.IntroOptions);
  var challangeText = new Text("The 13th Bullet", globals.canvas.width / 5, globals.canvas.height / 2 - 50, 75, 10, false);
  var js13k = new Text("JS13K by a 15 year old", globals.canvas.width / 4.5, globals.canvas.height / 2 + 50, 50, 5, false);
  var pressEnter = new Text("Press Enter to start", globals.canvas.width / 3.25, globals.canvas.height / 2 + 125, 35, 5, true);
  var AsTheLast = new Text("As the last bullet fires and the weapon falls silent", 400, 100, 20, 15, false);
  var AnOverwhelming = new Text("an overwhelming dread engulfs him", 600, 125, 20, 15, false);
  var AndHeFeels = new Text("and he feels himself growing larger", 585, 150, 20, 15, false);
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
  var part = 0;
  var IntroText1 = new Text("This is your player", 415, 200, 20, 20, false);
  var KeyboardText1 = new Text("Use W A S D or The Arrow Keys", 325, 200, 20, 20, false);
  var RunAroundJump = new Text("to run around and jump", 400, 230, 20, 20, false);
  var PhobiaText = new Text("You have a phobia about running out of bullets", 200, 200, 20, 20, false);
  var PhobiaText2 = new Text("You only have 13 left ....", 400, 230, 20, 20, false);
  var BulletText = new Text("Click to shoot a bullet", 375, 400, 20, 20, false);
  var DontRunOut = new Text("Whatever you do dont run out of bullets", 280, 400, 20, 20, false);
  var PressEnterToSkip = new Text("Press Enter to skip", 10, 10, 15, 500, true);
  var end = new Text("You died with " + globals.kills + " kill", 700, 200, 25, 20, false);
  function loop() {
    globals.debugBlocks = [];
    globals.ctx.fillStyle = "black";
    globals.ctx.imageSmoothingEnabled = false;
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
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
      globals.ctx.save();
      globals.ctx.scale(1.25, 1.25);
      globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
      globals.currentLevel = intro;
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
          part = null;
        }
      }, 1e3);
      if (part === 0) {
        PhobiaText.draw();
        PhobiaText.startTyping();
        PhobiaText2.draw();
        PhobiaText2.startTyping();
        setTimeout(() => {
          part = 1;
        }, 5e3);
      }
      if (part === 1) {
        IntroText1.draw();
        IntroText1.startTyping();
        setTimeout(() => {
          part = 2;
        }, 5e3);
      }
      if (part === 2) {
        KeyboardText1.draw();
        KeyboardText1.startTyping();
        RunAroundJump.draw();
        RunAroundJump.startTyping();
        setTimeout(() => {
          part = 3;
        }, 5e3);
      }
      if (part === 3) {
        BulletText.draw();
        BulletText.startTyping();
        setTimeout(() => {
          part = 4;
        }, 5e3);
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
        part = null;
      }
      for (let i = 0; i < globals.blocks.length; i++) {
        globals.blocks[i].draw(globals.ctx, globals.currentLevel.options.tint.r, globals.currentLevel.options.tint.g, globals.currentLevel.options.tint.b);
      }
      player.draw(globals.ctx);
      globals.bullets.forEach((bullet) => {
        bullet.update(globals.ctx);
      });
      player.update(globals.currentKey, globals.currentLevel);
      globals.SCROLLX = (player.bounds.x - globals.canvas.width / 2) / 1.4;
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
        }, 3500);
      }, 6e3);
    }
    if (globals.currentScreen == "game") {
      globals.timePlayed += 0.05;
      globals.ctx.save();
      globals.ctx.scale(1.25, 1.25);
      globals.ctx.translate(-globals.SCROLLX, -globals.SCROLLY);
      globals.particleEngine.update(0.01);
      player.update(globals.currentKey, globals.currentLevel);
      boss.update(globals.currentLevel);
      globals.particleEngine.draw();
      globals.bullets.forEach((bullet) => {
        bullet.update(globals.ctx);
      });
      if (globals.debug == true) {
        for (let i = 0; i < globals.debugBlocks.length; i++) {
          globals.ctx.lineWidth = 5;
          globals.ctx.strokeStyle = "red";
          if (i == 4) {
            globals.ctx.strokeStyle = "blue";
          }
          if (i == 5) {
            globals.ctx.strokeStyle = "green";
          }
          globals.ctx.strokeRect(globals.debugBlocks[i].bounds.x, globals.debugBlocks[i].bounds.y, globals.debugBlocks[i].bounds.w, globals.debugBlocks[i].bounds.h);
        }
      }
      for (let i = 0; i < globals.blocks.length; i++) {
        globals.blocks[i].draw(globals.ctx, globals.currentLevel.options.tint.r, globals.currentLevel.options.tint.g, globals.currentLevel.options.tint.b);
      }
      player.draw(globals.ctx, globals.particleEngine);
      for (let i = 0; i < globals.enemys.length; i++) {
        globals.enemys[i].draw();
        globals.enemys[i].update(globals.currentLevel);
      }
      if (globals.PlayerToBig) {
        globals.currentScreen = "big";
      }
      if (!globals.PlayerToBig) {
        let leveltext = new Text(globals.currentLevel.id, 350, 200, 75, 500, false);
        leveltext.draw();
      }
      boss.draw();
      globals.SCROLLX = (player.bounds.x - globals.canvas.width / 2) / 1.4;
      globals.ctx.restore();
    }
    console.log(globals.mobsLeft);
    if (globals.mobsLeft < 1) {
    }
    globals.navKey.clear();
    requestAnimationFrame(loop);
  }
  function init() {
    keyboardInit();
    loop();
  }
  init();
})();
