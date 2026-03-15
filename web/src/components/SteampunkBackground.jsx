import React, { useEffect, useRef } from 'react';

const SteampunkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // --- CONFIGURAÇÃO DAS TUBULAÇÕES ---
    const pipes = [
      // Lado esquerdo - cano principal vertical
      { x: 60, y: 0, w: 18, h: '100%', dir: 'v', color: '#4a7c7e', accent: '#64ffda' },
      // Lado direito - cano principal vertical
      { x: null, xRight: 60, y: 0, w: 18, h: '100%', dir: 'v', color: '#4a6d6e', accent: '#52d9b5' },
      // Cano horizontal superior
      { x: 60, y: 120, w: '30%', h: 14, dir: 'h', color: '#3d6566', accent: '#64ffda' },
      // Cano horizontal médio esquerdo
      { x: 60, y: 480, w: '20%', h: 12, dir: 'h', color: '#3d6566', accent: '#52d9b5' },
      // Cano horizontal médio direito
      { x: null, xRight: 60, y: 350, w: '25%', h: 12, dir: 'h', color: '#3d6566', accent: '#64ffda' },
      // Cano diagonal (efeito perspectiva)
      { x: 60, y: 700, w: '15%', h: 10, dir: 'h', color: '#2e5254', accent: '#45c9a8' },
    ];

    // --- ENGRENAGENS ---
    const gears = [
      { x: 78, y: 121, r: 28, teeth: 10, speed: 0.008, color: '#4a7c7e' },
      { x: 78, y: 481, r: 22, teeth: 8, speed: -0.012, color: '#3d6566' },
      { x: null, xRight: 78, y: 351, r: 24, teeth: 9, speed: 0.01, color: '#4a6d6e' },
      { x: null, xRight: 78, y: 121, r: 20, teeth: 7, speed: -0.009, color: '#3a6060' },
      { x: 200, y: 250, r: 16, teeth: 6, speed: 0.015, color: '#2e5254', small: true },
      { x: null, xRight: 200, y: 500, r: 18, teeth: 7, speed: -0.011, color: '#2e5254', small: true },
    ];

    // --- VÁLVULAS ---
    const valves = [
      { x: 60, y: 300, size: 20 },
      { x: null, xRight: 60, y: 220, size: 18 },
      { x: 60, y: 650, size: 16 },
    ];

    // --- BOLHAS ---
    const bubbles = Array.from({ length: 35 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 3),
      r: Math.random() * 5 + 2,
      speed: Math.random() * 0.6 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    // --- ALGAS / PLANTAS ---
    const seaweeds = Array.from({ length: 12 }, (_, i) => ({
      x: 100 + (i * (window.innerWidth / 13)),
      baseY: canvas.height,
      segments: 5 + Math.floor(Math.random() * 4),
      segLen: 28 + Math.random() * 20,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.006,
      color: i % 3 === 0 ? '#1a5c4a' : i % 3 === 1 ? '#1e6b52' : '#155040',
      width: 4 + Math.random() * 4,
    }));

    // --- PARTÍCULAS DE VAPOR/FUMAÇA ---
    const steamParticles = Array.from({ length: 20 }, (_, i) => ({
      x: 78 + (Math.random() - 0.5) * 20,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      opacity: Math.random() * 0.3,
      speed: Math.random() * 0.3 + 0.1,
      side: i % 2 === 0 ? 'left' : 'right',
    }));

    function drawGear(ctx, cx, cy, outerR, innerR, teeth, angle, color) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Corpo da engrenagem
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.4) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.6) / teeth) * Math.PI * 2;
        const a4 = ((i + 1) / teeth) * Math.PI * 2;
        if (i === 0) ctx.moveTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
        ctx.lineTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
        ctx.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
        ctx.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
        ctx.lineTo(Math.cos(a4) * innerR, Math.sin(a4) * innerR);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#64ffda22';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Buraco central
      ctx.beginPath();
      ctx.arc(0, 0, innerR * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = '#071a2a';
      ctx.fill();
      ctx.strokeStyle = '#64ffda33';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Detalhes internos
      ctx.beginPath();
      ctx.arc(0, 0, innerR * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = color + '66';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    function drawPipe(ctx, x, y, w, h, isVertical, color, accent, glowAlpha) {
      // Sombra/glow
      ctx.shadowColor = accent;
      ctx.shadowBlur = 6 * glowAlpha;

      // Corpo do cano
      const grad = isVertical
        ? ctx.createLinearGradient(x, 0, x + w, 0)
        : ctx.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0, '#071a2a');
      grad.addColorStop(0.3, color);
      grad.addColorStop(0.7, color);
      grad.addColorStop(1, '#071a2a');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Brilho superior
      const highlight = isVertical
        ? ctx.createLinearGradient(x, 0, x + w * 0.4, 0)
        : ctx.createLinearGradient(0, y, 0, y + h * 0.4);
      highlight.addColorStop(0, 'rgba(100,255,218,0.12)');
      highlight.addColorStop(1, 'transparent');
      ctx.fillStyle = highlight;
      ctx.fillRect(x, y, isVertical ? w * 0.4 : w, isVertical ? h : h * 0.4);

      // Rebites ao longo do cano
      const rivetCount = isVertical ? Math.floor(h / 80) : Math.floor(w / 100);
      const rivetColor = accent + '55';
      for (let i = 0; i < rivetCount; i++) {
        const rx = isVertical ? x + w / 2 : x + 40 + i * (w / rivetCount);
        const ry = isVertical ? y + 40 + i * (h / rivetCount) : y + h / 2;
        ctx.beginPath();
        ctx.arc(rx, ry, 3, 0, Math.PI * 2);
        ctx.fillStyle = rivetColor;
        ctx.fill();
        ctx.strokeStyle = '#071a2a';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    }

    function drawSeaweed(ctx, sw, time) {
      ctx.save();
      let px = sw.x;
      let py = sw.baseY;

      for (let i = 0; i < sw.segments; i++) {
        const wave = Math.sin(time * sw.speed * 60 + sw.phase + i * 0.5) * (12 + i * 3);
        const nx = px + wave;
        const ny = py - sw.segLen;

        const alpha = 0.3 + (i / sw.segments) * 0.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(px + wave * 1.5, py - sw.segLen / 2, nx, ny);
        ctx.strokeStyle = sw.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = sw.width * (1 - i / sw.segments / 1.5);
        ctx.lineCap = 'round';
        ctx.stroke();

        px = nx;
        py = ny;
      }
      ctx.restore();
    }

    function drawValve(ctx, cx, cy, size, t) {
      ctx.save();
      ctx.translate(cx, cy);

      // Corpo circular da válvula
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = '#0d2a3a';
      ctx.fill();
      ctx.strokeStyle = '#64ffda44';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cruz central girando levemente
      const rot = Math.sin(t * 0.5) * 0.1;
      ctx.rotate(rot);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.fillStyle = '#4a7c7e';
        ctx.fillRect(-2, -size * 0.9, 4, size * 0.4);
      }

      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;

      // Fundo gradiente oceano profundo
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#071520');
      bgGrad.addColorStop(0.3, '#0a1f2e');
      bgGrad.addColorStop(1, '#020c1b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Raios de luz vindos do topo (caustics)
      for (let i = 0; i < 6; i++) {
        const lx = (W / 7) * (i + 1) + Math.sin(time * 0.3 + i) * 30;
        const grad = ctx.createLinearGradient(lx, 0, lx + 60, H * 0.6);
        grad.addColorStop(0, 'rgba(100,255,218,0.04)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(lx - 20, 0);
        ctx.lineTo(lx + 80, 0);
        ctx.lineTo(lx + 20, H * 0.6);
        ctx.lineTo(lx - 60, H * 0.6);
        ctx.closePath();
        ctx.fill();
      }

      const glowPulse = 0.5 + 0.5 * Math.sin(time * 1.5);

      // === CANO VERTICAL ESQUERDO ===
      drawPipe(ctx, 42, 0, 18, H, true, '#4a7c7e', '#64ffda', glowPulse);

      // === CANO VERTICAL DIREITO ===
      drawPipe(ctx, W - 60, 0, 18, H, true, '#4a6d6e', '#52d9b5', glowPulse);

      // === CANOS HORIZONTAIS ===
      // Superior esquerdo
      drawPipe(ctx, 60, 112, W * 0.28, 14, false, '#3d6566', '#64ffda', glowPulse * 0.7);
      // Médio esquerdo
      drawPipe(ctx, 60, 472, W * 0.20, 12, false, '#3d6566', '#52d9b5', glowPulse * 0.8);
      // Médio direito
      drawPipe(ctx, W - 60 - W * 0.22, 342, W * 0.22, 12, false, '#3d6566', '#64ffda', glowPulse * 0.9);
      // Profundo esquerdo
      drawPipe(ctx, 60, 720, W * 0.15, 10, false, '#2e5254', '#45c9a8', glowPulse * 0.6);

      // === ENGRENAGENS ===
      const gearDefs = [
        { cx: 78, cy: 119, r: 26, ri: 16, t: 10, speed: 0.008 },
        { cx: 78, cy: 479, r: 20, ri: 13, t: 8, speed: -0.012 },
        { cx: W - 51, cy: 349, r: 22, ri: 14, t: 9, speed: 0.010 },
        { cx: W - 51, cy: 119, r: 18, ri: 11, t: 7, speed: -0.009 },
        { cx: 60 + W * 0.28, cy: 119, r: 14, ri: 9, t: 6, speed: 0.018 },
        { cx: W - 60 - W * 0.22, cy: 349, r: 14, ri: 9, t: 6, speed: -0.015 },
      ];
      gearDefs.forEach((g, i) => {
        drawGear(ctx, g.cx, g.cy, g.r, g.ri, g.t, time * g.speed * 60, '#4a7c7e');
      });

      // === VÁLVULAS ===
      drawValve(ctx, 78, 300, 20, time);
      drawValve(ctx, W - 51, 220, 18, time);
      drawValve(ctx, 78, 660, 16, time);

      // === ALGAS ===
      seaweeds.forEach(sw => {
        sw.baseY = H; // atualiza base dinâmica
        drawSeaweed(ctx, sw, time);
      });

      // === BOLHAS ===
      bubbles.forEach(b => {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        const bx = b.x + Math.sin(b.wobble) * 3;
        if (b.y < -20) {
          b.y = H + 20;
          b.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,255,218,${b.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Reflexo interno
        ctx.beginPath();
        ctx.arc(bx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,218,${b.opacity * 0.5})`;
        ctx.fill();
      });

      // === PARTÍCULAS DE VAPOR (saindo dos canos) ===
      steamParticles.forEach(p => {
        p.y -= p.speed;
        p.opacity = Math.max(0, p.opacity - 0.002);
        if (p.opacity <= 0 || p.y < 0) {
          p.y = Math.random() * H;
          p.opacity = Math.random() * 0.25 + 0.05;
          p.x = p.side === 'left'
            ? 51 + (Math.random() - 0.5) * 10
            : W - 51 + (Math.random() - 0.5) * 10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,218,${p.opacity * 0.3})`;
        ctx.fill();
      });

      // Overlay escuro nas bordas para profundidade
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(2,12,27,0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SteampunkBackground;