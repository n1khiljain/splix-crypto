"use client"

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid configuration
    const gridSize = 40;
    const activeSquares: Array<{
      x: number;
      y: number;
      alpha: number;
      color: string;
      fadeSpeed: number;
    }> = [];

    const colors = [
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#3b82f6', // blue
      '#10b981', // green
    ];

    // Add random active squares
    const addRandomSquare = () => {
      if (activeSquares.length < 15) {
        const cols = Math.floor(canvas.width / gridSize);
        const rows = Math.floor(canvas.height / gridSize);
        
        activeSquares.push({
          x: Math.floor(Math.random() * cols) * gridSize,
          y: Math.floor(Math.random() * rows) * gridSize,
          alpha: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          fadeSpeed: 0.005 + Math.random() * 0.01,
        });
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear with dark background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw active squares
      for (let i = activeSquares.length - 1; i >= 0; i--) {
        const square = activeSquares[i];

        // Fade in then fade out
        if (square.alpha < 0.3) {
          square.alpha += square.fadeSpeed;
        } else {
          square.alpha -= square.fadeSpeed * 0.5;
        }

        // Remove if fully faded
        if (square.alpha <= 0) {
          activeSquares.splice(i, 1);
          continue;
        }

        // Convert hex to rgba
        const hexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        // Draw glowing square
        ctx.fillStyle = hexToRgba(square.color, square.alpha);
        ctx.fillRect(square.x + 2, square.y + 2, gridSize - 4, gridSize - 4);

        // Draw glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = square.color;
        ctx.fillRect(square.x + 2, square.y + 2, gridSize - 4, gridSize - 4);
        ctx.shadowBlur = 0;
      }

      // Randomly add new squares
      if (Math.random() < 0.02) {
        addRandomSquare();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ 
        background: '#0f172a',
        pointerEvents: 'none'
      }}
    />
  );
}
