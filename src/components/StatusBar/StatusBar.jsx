import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StatusBar.css';

const statuses = [
  { emoji: '🔴', text: 'Currently building: Portfolio v2' },
  { emoji: '📚', text: 'Learning: System Design & Distributed Systems' },
  { emoji: '💼', text: 'Open to internship opportunities' },
];

export default function StatusBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="status-item"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="status-emoji">{statuses[index].emoji}</span>
            <span className="status-text">{statuses[index].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
