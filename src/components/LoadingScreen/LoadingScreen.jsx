import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const slashRef = useRef(null);
  const glowRef = useRef(null);
  const laserRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const overlayRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationDone(true);
          onComplete?.();
        }
      });

      // Phase 1: Logo appears with glow build (0s - 0.4s)
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
      );

      // Purple glow builds
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );

      // Slash cyan glow
      tl.fromTo(slashRef.current,
        { textShadow: '0 0 0px rgba(34, 211, 238, 0)' },
        { textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)', duration: 0.3, ease: 'power2.in' },
        '-=0.2'
      );

      // Phase 2: Laser cut (0.4s - 0.7s)
      tl.fromTo(laserRef.current,
        { opacity: 0, scaleX: 0, rotate: -35 },
        { opacity: 1, scaleX: 1, rotate: -35, duration: 0.3, ease: 'power3.in' },
        '+=0.1'
      );

      // Flash on laser impact
      tl.to(laserRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out'
      });

      // Phase 3: Screen splits (0.7s - 1.1s)
      // Create the clip-path halves
      tl.to(topHalfRef.current, {
        y: '-110%',
        rotation: -2,
        filter: 'blur(4px)',
        duration: 0.45,
        ease: 'power3.in'
      }, '+=0.05');

      tl.to(bottomHalfRef.current, {
        y: '110%',
        rotation: 2,
        filter: 'blur(4px)',
        duration: 0.45,
        ease: 'power3.in'
      }, '<');

      // Fade overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.3');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (animationDone) return null;

  return (
    <div className="paper-cut-loader" ref={containerRef}>
      {/* The split halves */}
      <div className="paper-half paper-top" ref={topHalfRef}>
        <div className="paper-half-content">
          <div className="paper-logo" ref={logoRef}>
            <span className="paper-bracket">&lt;</span>
            <span className="paper-dev">Dev</span>
            <span className="paper-slash" ref={slashRef}> /</span>
            <span className="paper-bracket">&gt;</span>
          </div>
          <div className="paper-glow" ref={glowRef} />
        </div>
      </div>

      <div className="paper-half paper-bottom" ref={bottomHalfRef}>
        <div className="paper-half-content paper-bottom-inner" />
      </div>

      {/* Laser line */}
      <div className="laser-line" ref={laserRef} />

      {/* Dark overlay for flash */}
      <div className="paper-overlay" ref={overlayRef} />
    </div>
  );
}
