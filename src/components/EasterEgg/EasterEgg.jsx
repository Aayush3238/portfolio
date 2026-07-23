import { useEffect, useState, useRef } from 'react';
import './EasterEgg.css';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function MatrixRain({ active, onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);
    let opacity = 1;
    let animId;

    const draw = () => {
      ctx.fillStyle = `rgba(11, 11, 20, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.9})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (opacity > 0) {
        opacity -= 0.003;
      }

      if (opacity <= 0) {
        cancelAnimationFrame(animId);
        onDone();
        return;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, [active, onDone]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="matrix-rain" />;
}

export default function EasterEgg() {
  const [sequence, setSequence] = useState([]);
  const [showRain, setShowRain] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setSequence((prev) => {
        const next = [...prev, e.code];
        if (next.length > KONAMI.length) {
          next.shift();
        }

        const isMatch = next.length === KONAMI.length &&
          next.every((key, i) => key === KONAMI[i]);

        if (isMatch) {
          setShowRain(true);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
          return [];
        }

        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <MatrixRain active={showRain} onDone={() => setShowRain(false)} />
      {showMessage && (
        <div className="easter-egg-message">
          <span className="easter-egg-text">🎮 Konami Code Activated!</span>
        </div>
      )}
    </>
  );
}
