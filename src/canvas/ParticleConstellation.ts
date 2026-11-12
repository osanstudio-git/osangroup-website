interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

const BRAND_BLUES = [
  '#2473AB', // osan-blue
  '#1B5683', // osan-deep
  '#2A93D5', // brand cyan-blue
  '#38BDF8', // sky accent
  '#5BA4CF', // soft azure
];

export class ParticleConstellation {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private width: number = 0;
  private height: number = 0;
  private dpr: number = 1;
  private pointer: { x: number; y: number; active: boolean } = {
    x: -9999,
    y: -9999,
    active: false,
  };
  private reducedMotion: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'w-full h-full block pointer-events-none';
    this.container.prepend(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.initParticles();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.initParticles();
      if (this.reducedMotion) {
        this.drawFrame(0);
      }
    });
    this.resizeObserver.observe(this.container);

    this.container.addEventListener('pointermove', this.handlePointerMove);
    this.container.addEventListener('pointerleave', this.handlePointerLeave);

    if (this.reducedMotion) {
      this.drawFrame(0);
    } else {
      this.animate();
    }
  }

  private resize(): void {
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    if (this.ctx) {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
  }

  private initParticles(): void {
    const area = this.width * this.height;
    // Balanced density across mobile, tablet, and desktop
    const count = Math.max(34, Math.min(92, Math.floor(area / 13500)));
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const speed = 0.22 + Math.random() * 0.34;
      const angle = Math.random() * Math.PI * 2;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.6 + Math.random() * 2.2,
        color: BRAND_BLUES[i % BRAND_BLUES.length],
        alpha: 0.45 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  private handlePointerMove = (e: PointerEvent): void => {
    const rect = this.container.getBoundingClientRect();
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
    this.pointer.active = true;
  };

  private handlePointerLeave = (): void => {
    this.pointer.active = false;
  };

  private animate = (time: number = 0): void => {
    this.updateParticles();
    this.drawFrame(time);
    this.rafId = requestAnimationFrame(this.animate);
  };

  private updateParticles(): void {
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Subtle cursor repulsion/glide so particles feel alive around the pointer
      if (this.pointer.active) {
        const dx = p.x - this.pointer.x;
        const dy = p.y - this.pointer.y;
        const distSq = dx * dx + dy * dy;
        const influenceRadius = 125;
        if (distSq > 1 && distSq < influenceRadius * influenceRadius) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / influenceRadius) * 0.035;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Clamp velocity gently so particles never accelerate excessively
      const maxSpeed = 0.72;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // Soft edge bounce
      if (p.x <= 0) {
        p.x = 0;
        p.vx = Math.abs(p.vx);
      } else if (p.x >= this.width) {
        p.x = this.width;
        p.vx = -Math.abs(p.vx);
      }

      if (p.y <= 0) {
        p.y = 0;
        p.vy = Math.abs(p.vy);
      } else if (p.y >= this.height) {
        p.y = this.height;
        p.vy = -Math.abs(p.vy);
      }
    }
  }

  private drawFrame(time: number): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    const linkDist = this.width < 640 ? 115 : 150;
    const linkDistSq = linkDist * linkDist;

    // 1. Draw constellation connection lines
    ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < linkDistSq) {
          const ratio = 1 - Math.sqrt(distSq) / linkDist;
          ctx.strokeStyle = `rgba(36, 115, 171, ${(ratio * 0.28).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pointer constellation links
      if (this.pointer.active) {
        const dx = a.x - this.pointer.x;
        const dy = a.y - this.pointer.y;
        const pointerDist = 175;
        const distSq = dx * dx + dy * dy;
        if (distSq < pointerDist * pointerDist) {
          const ratio = 1 - Math.sqrt(distSq) / pointerDist;
          ctx.strokeStyle = `rgba(42, 147, 213, ${(ratio * 0.42).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(this.pointer.x, this.pointer.y);
          ctx.stroke();
        }
      }
    }

    // 2. Draw brand-blue particles with gentle ambient glow
    for (const p of this.particles) {
      const pulse = this.reducedMotion ? 1 : 0.85 + 0.15 * Math.sin(time * 0.002 + p.pulsePhase);
      const r = p.radius * pulse;

      // Subtle outer halo
      ctx.save();
      ctx.globalAlpha = p.alpha * 0.22;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  public destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.container.removeEventListener('pointermove', this.handlePointerMove);
    this.container.removeEventListener('pointerleave', this.handlePointerLeave);
    if (this.canvas.parentElement === this.container) {
      this.container.removeChild(this.canvas);
    }
  }
}

