import { useEffect, useRef } from 'react';
import './AnimatedGrid.css';

const PARTICLE_COUNT_BASE = 90;
const ORB_COUNT = 6;
const SHAPE_COUNT = 8;
const TRAIL_LENGTH = 12;

const PURPLE = [139, 92, 246];
const CYAN = [34, 211, 238];

function lerpColor(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export default function AnimatedGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -9999, y: -9999 };
    let scrollY = 0;
    let trail = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trail.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.length > TRAIL_LENGTH) trail.shift();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const particleCount = Math.min(
      PARTICLE_COUNT_BASE,
      Math.floor((canvas.width * canvas.height) / 13000)
    );

    // ── Layer 1: Gradient Orbs ──────────────────────────────────
    class Orb {
      constructor(i) {
        this.index = i;
        this.reset(true);
      }
      reset(init) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 200;
        this.radius = 150 + Math.random() * 250;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = -(0.05 + Math.random() * 0.12);
        this.color = Math.random() > 0.45 ? PURPLE : CYAN;
        this.opacity = 0.04 + Math.random() * 0.05;
        this.phase = Math.random() * Math.PI * 2;
        this.breathSpeed = 0.003 + Math.random() * 0.004;
      }
      update() {
        this.x += this.speedX + Math.sin(time * 0.0005 + this.phase) * 0.2;
        this.y += this.speedY;
        this.opacity =
          (0.04 + Math.random() * 0.005) *
          (0.8 + 0.2 * Math.sin(time * this.breathSpeed + this.phase));
        if (this.y < -this.radius * 2 || this.x < -this.radius || this.x > canvas.width + this.radius) {
          this.reset(false);
        }
      }
      draw() {
        const scrollOffset = (scrollY * 0.03 * (this.index % 3 === 0 ? -1 : 1)) % canvas.height;
        const cy = ((this.y + scrollOffset) % (canvas.height + this.radius * 2)) - this.radius;
        const grad = ctx.createRadialGradient(this.x, cy, 0, this.x, cy, this.radius);
        const [r, g, b] = this.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${this.opacity * 1.5})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${this.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, cy, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── Layer 2: Geometric Wireframes ───────────────────────────
    class GeoShape {
      constructor() {
        this.reset(true);
      }
      reset(init) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -100;
        this.size = 20 + Math.random() * 40;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.004;
        this.speedY = 0.1 + Math.random() * 0.2;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.sides = Math.random() > 0.5 ? 6 : 3;
        this.opacity = 0.06 + Math.random() * 0.06;
        this.color = Math.random() > 0.5 ? PURPLE : CYAN;
      }
      update() {
        this.rotation += this.rotSpeed;
        this.x += this.speedX + Math.sin(time * 0.001 + this.x * 0.01) * 0.15;
        this.y += this.speedY;
        if (this.y > canvas.height + this.size * 2) this.reset(false);
      }
      draw() {
        const mouseDx = mouse.x - this.x;
        const mouseDy = mouse.y - this.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        let extraRotation = 0;
        if (mouseDist < 200) {
          extraRotation = ((200 - mouseDist) / 200) * 0.3 * (mouseDx > 0 ? 1 : -1);
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation + extraRotation);
        ctx.beginPath();
        for (let i = 0; i <= this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides - Math.PI / 2;
          const px = Math.cos(angle) * this.size;
          const py = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const [r, g, b] = this.color;
        ctx.strokeStyle = `rgba(${r},${g},${b},${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    // ── Layer 3: Particles ──────────────────────────────────────
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.7 ? CYAN : PURPLE;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += 0.02;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          this.x -= dx * force * 0.015;
          this.y -= dy * force * 0.015;
          this.opacity = Math.min(this.opacity + 0.03, 0.9);
        } else {
          this.opacity += (Math.random() * 0.5 + 0.1 - this.opacity) * 0.01;
        }

        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset();
        }
      }
      draw() {
        const pulse = 0.85 + 0.15 * Math.sin(this.pulsePhase);
        const [r, g, b] = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
        ctx.fill();
      }
    }

    // ── Mouse Trail Glow ────────────────────────────────────────
    const drawTrail = () => {
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age++;
        if (trail[i].age > 30) {
          trail.splice(i, 1);
          continue;
        }
        const t = trail[i];
        const alpha = (1 - t.age / 30) * 0.25;
        const radius = 3 + (1 - t.age / 30) * 10;
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, radius);
        grad.addColorStop(0, `rgba(139,92,246,${alpha})`);
        grad.addColorStop(0.6, `rgba(34,211,238,${alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ── Connect Nearby Particles ────────────────────────────────
    const connectParticles = (particles) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.09;
            const mixedColor = lerpColor(
              particles[i].color,
              particles[j].color,
              0.5
            );
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${mixedColor[0]},${mixedColor[1]},${mixedColor[2]},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── Init Objects ────────────────────────────────────────────
    const orbs = Array.from({ length: ORB_COUNT }, (_, i) => new Orb(i));
    const shapes = Array.from({ length: SHAPE_COUNT }, () => new GeoShape());
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // ── Main Loop ───────────────────────────────────────────────
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer 1: orbs
      for (const orb of orbs) {
        orb.update();
        orb.draw();
      }

      // Layer 2: geometric shapes
      for (const shape of shapes) {
        shape.update();
        shape.draw();
      }

      // Layer 3: particles + connections
      for (const p of particles) {
        p.update();
        p.draw();
      }
      connectParticles(particles);

      // Mouse trail
      drawTrail();

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-grid-canvas" />;
}
