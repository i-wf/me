"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  age: number;
  size: number;
  rotation: number;
  vx: number;
  vy: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const animFrame = useRef<number>(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastMouse.current = { x: e.clientX, y: e.clientY };

      // Spawn stars based on speed
      const count = Math.min(3, Math.floor(speed / 8) + 1);
      for (let i = 0; i < count; i++) {
        stars.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          age: 0,
          size: Math.random() * 2.5 + 1,
          rotation: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.3,
        });
      }
      if (stars.current.length > 80) stars.current.splice(0, stars.current.length - 80);
    };
    window.addEventListener("mousemove", onMouseMove);

    const drawStar = (cx: number, cy: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // 4-pointed star
      ctx.beginPath();
      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.current = stars.current.filter((s) => {
        s.age++;
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += 0.03;
        return s.age < 50;
      });

      for (const s of stars.current) {
        const alpha = Math.max(0, 1 - s.age / 50) * 0.7;
        const shrink = Math.max(0.2, 1 - s.age / 50);
        drawStar(s.x, s.y, s.size * shrink, s.rotation, alpha);
      }

      animFrame.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
