import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  slideFromBottom: {
    hidden: { opacity: 0, y: 100, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  diagonalWipe: {
    hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    visible: { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
};

export default function SectionReveal({ children, variant = 'fadeUp', delay = 0, margin = '-80px' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  const v = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { ...v.visible.transition, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
