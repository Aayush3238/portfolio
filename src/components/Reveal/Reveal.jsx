import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const presets = {
  up: { y: 34, x: 0 },
  left: { y: 0, x: -34 },
  right: { y: 0, x: 34 },
  none: { y: 0, x: 0 },
};

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  variant = 'up',
  margin = '-60px',
  className,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  const reduce = useReducedMotion();
  const offset = presets[variant] || presets.up;
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
