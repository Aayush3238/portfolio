import { useEffect, useRef, useState } from 'react';
import './CursorSpotlight.css';

export default function CursorSpotlight() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const spotPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a') ||
        target.closest('button') ||
        target.closest('.skill-item') ||
        target.closest('.project-card') ||
        target.closest('.timeline-item') ||
        target.closest('.achievement-card') ||
        target.closest('.about-highlight-card') ||
        target.closest('.nav-links a') ||
        target.closest('.project-detail') ||
        target.closest('.theme-toggle');
      setIsHovering(!!isInteractive);
    };

    let animId;
    const animate = () => {
      const { x: mx, y: my } = mousePos.current;

      dotPos.current.x += (mx - dotPos.current.x) * 0.2;
      dotPos.current.y += (my - dotPos.current.y) * 0.2;
      ringPos.current.x += (mx - ringPos.current.x) * 0.1;
      ringPos.current.y += (my - ringPos.current.y) * 0.1;
      spotPos.current.x += (mx - spotPos.current.x) * 0.05;
      spotPos.current.y += (my - spotPos.current.y) * 0.05;

      dot.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px)`;
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      spotlight.style.transform = `translate(${spotPos.current.x - 200}px, ${spotPos.current.y - 200}px)`;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} className="cursor-spotlight" />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'cursor-ring-hover' : ''}`} />
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'cursor-dot-hover' : ''}`} />
    </>
  );
}
