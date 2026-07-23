import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function ScrambleText({ text, className, delay = 0 }) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let timeoutId;
    let iteration = 0;
    const maxIterations = text.length * 3;

    const scramble = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return text[i];
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration <= maxIterations) {
        const speed = iteration > text.length ? 20 : 35;
        timeoutId = setTimeout(scramble, speed);
      } else {
        setDisplay(text);
      }
    };

    timeoutId = setTimeout(scramble, delay);
    return () => clearTimeout(timeoutId);
  }, [started, text, delay]);

  return (
    <span ref={ref} className={className}>
      {display || text}
    </span>
  );
}
