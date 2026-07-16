import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const logo = useAnimation();
  const glow = useAnimation();
  const slash = useAnimation();
  const laser = useAnimation();
  const cutGlow = useAnimation();
  const topHalf = useAnimation();
  const bottomHalf = useAnimation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const sequence = async () => {
      // Phase 1: Logo appears with glow build
      await Promise.all([
        logo.start({
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
        glow.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
        }),
      ]);

      // Slash cyan glow intensifies
      await slash.start({
        textShadow: '0 0 25px rgba(34, 211, 238, 0.9), 0 0 50px rgba(34, 211, 238, 0.5), 0 0 80px rgba(34, 211, 238, 0.2)',
        transition: { duration: 0.35, ease: 'easeIn' },
      });

      await new Promise((r) => setTimeout(r, 80));

      // Phase 2: Laser cut slices across the screen + cut glow
      await Promise.all([
        laser.start({
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.25, ease: [0.36, 0, 0.66, -0.56] },
        }),
        cutGlow.start({
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.25, ease: [0.36, 0, 0.66, -0.56] },
        }),
      ]);

      // Laser fades out
      await laser.start({
        opacity: 0,
        transition: { duration: 0.12, ease: 'easeOut' },
      });

      // Phase 3: Screen tears apart along the cut
      await Promise.all([
        topHalf.start({
          y: '-105%',
          rotate: -1.5,
          filter: 'blur(6px)',
          transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] },
        }),
        bottomHalf.start({
          y: '105%',
          rotate: 1.5,
          filter: 'blur(6px)',
          transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] },
        }),
      ]);

      // Cut glow lingers then fades (concurrent with tear)
      cutGlow.start({
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      });

      document.body.style.overflow = '';
      setVisible(false);
      onComplete?.();
    };

    sequence();

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete, logo, glow, slash, laser, cutGlow, topHalf, bottomHalf]);

  if (!visible) return null;

  return (
    <div className="paper-cut-loader">
      {/* Top torn half */}
      <motion.div
        className="paper-half paper-top"
        animate={topHalf}
        initial={{ y: 0, rotate: 0, filter: 'blur(0px)' }}
      >
        <div className="paper-half-content">
          <motion.div
            className="paper-logo"
            animate={logo}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          >
            <span className="paper-bracket">&lt;</span>
            <span className="paper-dev">Dev</span>
            <motion.span
              className="paper-slash"
              animate={slash}
              initial={{ textShadow: '0 0 0px rgba(34, 211, 238, 0)' }}
            >
              {' /'}
            </motion.span>
            <span className="paper-bracket">&gt;</span>
          </motion.div>
          <motion.div
            className="paper-glow"
            animate={glow}
            initial={{ opacity: 0, scale: 0.5 }}
          />
        </div>
        <div className="paper-torn-edge paper-torn-bottom" />
      </motion.div>

      {/* Bottom torn half */}
      <motion.div
        className="paper-half paper-bottom"
        animate={bottomHalf}
        initial={{ y: 0, rotate: 0, filter: 'blur(0px)' }}
      >
        <div className="paper-torn-edge paper-torn-top" />
      </motion.div>

      {/* Diagonal laser line */}
      <motion.div
        className="laser-line"
        animate={laser}
        initial={{ opacity: 0, scaleX: 0 }}
      />

      {/* Glowing cut line that lingers */}
      <motion.div
        className="cut-glow-line"
        animate={cutGlow}
        initial={{ opacity: 0, scaleX: 0 }}
      />
    </div>
  );
}
