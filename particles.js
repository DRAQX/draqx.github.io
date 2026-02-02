// ===== PARTICLE BACKGROUND (STABLE, NO RESIZE REGEN) =====

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Virtual world size (larger than any expected screen)
const WORLD_WIDTH = 4000;
const WORLD_HEIGHT = 4000;

// Particle config
// const PARTICLE_COUNT = 200; legacy
const PARTICLE_COUNT = (WORLD_WIDTH * WORLD_HEIGHT) / 36000;
let particles = [];

// Resize only changes viewport, NOT particles
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * WORLD_WIDTH;
    this.y = Math.random() * WORLD_HEIGHT;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce inside world bounds
    if (this.x <= 0 || this.x >= WORLD_WIDTH) this.vx *= -1;
    if (this.y <= 0 || this.y >= WORLD_HEIGHT) this.vy *= -1;
  }

  draw() {
    // Draw only visible particles (cheap culling)
    if (
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height
    ) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  }
}

// Generate particles ONCE
function init() {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}
init();

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}
animate();