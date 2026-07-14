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
  const cutGlowRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setAnimationDone(true);
          onComplete?.();
        }
      });

      // Phase 1: Logo appears with glow build
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }
      );

      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );

      // Slash cyan glow intensifies
      tl.fromTo(slashRef.current,
        { textShadow: '0 0 0px rgba(34, 211, 238, 0)' },
        { textShadow: '0 0 25px rgba(34, 211, 238, 0.9), 0 0 50px rgba(34, 211, 238, 0.5), 0 0 80px rgba(34, 211, 238, 0.2)', duration: 0.35, ease: 'power2.in' },
        '-=0.2'
      );

      // Phase 2: Laser cut slices across the screen
      tl.fromTo(laserRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power4.in' },
        '+=0.08'
      );

      // Cut glow line appears
      tl.fromTo(cutGlowRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.25, ease: 'power4.in' },
        '<'
      );

      // Laser fades out
      tl.to(laserRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.out'
      });

      // Phase 3: Screen tears apart along the cut
      tl.to(topHalfRef.current, {
        y: '-105%',
        rotation: -1.5,
        filter: 'blur(6px)',
        duration: 0.5,
        ease: 'power3.in'
      }, '-=0.05');

      tl.to(bottomHalfRef.current, {
        y: '105%',
        rotation: 1.5,
        filter: 'blur(6px)',
        duration: 0.5,
        ease: 'power3.in'
      }, '<');

      // Cut glow lingers then fades
      tl.to(cutGlowRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.4');

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (animationDone) return null;

  return (
    <div className="paper-cut-loader" ref={containerRef}>
      {/* Top torn half */}
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
        {/* Torn edge - jagged bottom */}
        <div className="paper-torn-edge paper-torn-bottom" />
      </div>

      {/* Bottom torn half */}
      <div className="paper-half paper-bottom" ref={bottomHalfRef}>
        <div className="paper-torn-edge paper-torn-top" />
      </div>

      {/* Diagonal laser line */}
      <div className="laser-line" ref={laserRef} />

      {/* Glowing cut line that lingers */}
      <div className="cut-glow-line" ref={cutGlowRef} />
    </div>
  );
}
