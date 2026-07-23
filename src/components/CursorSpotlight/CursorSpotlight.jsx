import { useEffect, useRef, useState } from 'react';
import './CursorSpotlight.css';

export default function CursorSpotlight() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let spotX = 0;
    let spotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.skill-item') ||
        target.closest('.project-card') ||
        target.closest('.timeline-item') ||
        target.closest('.achievement-card') ||
        target.closest('.about-highlight-card') ||
        target.closest('.nav-links a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      spotX += (mouseX - spotX) * 0.06;
      spotY += (mouseY - spotY) * 0.06;

      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      spotlight.style.transform = `translate(${spotX - 150}px, ${spotY - 150}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const animId = requestAnimationFrame(animate);

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
