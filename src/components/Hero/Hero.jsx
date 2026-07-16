import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { personalInfo, heroIntro } from '../../data/portfolioData';
import './Hero.css';

const roles = [
  'Full Stack Web Developer',
  'Backend Engineer',
  'React Developer',
  'Problem Solver',
  'Software Engineer',
];

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="hero-typing-text">
      {text}
      <span className="hero-typing-cursor">|</span>
    </span>
  );
}

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export default function Hero({ isRevealed }) {
  const [scrollHidden, setScrollHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHidden(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-gradient" />
      <div className="hero-bg-gradient-2" />
      <div className="hero-bg-gradient-3" />
      <div className="container hero-container">
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="hero-content"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero-greeting" variants={itemVariants}>
                <span>Hello, I&apos;m</span>
              </motion.div>

              <motion.h1 className="hero-name" variants={itemVariants}>
                <span className="hero-name-gradient">{personalInfo.name}</span>
              </motion.h1>

              <motion.h2 className="hero-role" variants={itemVariants}>
                <TypingEffect />
              </motion.h2>

              <motion.p className="hero-intro" variants={itemVariants}>{heroIntro}</motion.p>

              <motion.div className="hero-buttons" variants={ctaVariants}>
                <a href="#projects" className="btn btn-primary hero-btn-glow">
                  View Projects
                  <FiArrowRight />
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Contact Me
                </a>
                <a href={personalInfo.resumePath} download className="btn btn-secondary">
                  Resume
                </a>
              </motion.div>

              <motion.div className="hero-socials" variants={itemVariants}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero-social-link">
                  <FaGithub />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero-social-link">
                  <FaLinkedin />
                </a>
                <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="hero-social-link">
                  <FaEnvelope />
                </a>
                {personalInfo.twitter && (
                  <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hero-social-link">
                    <FaTwitter />
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="hero-image-wrapper"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="hero-character-area">
                <div className="hero-orbit-ring" />
                <div className="hero-floating-tag hero-tag-1">
                  <span>&lt; /&gt;</span>
                </div>
                <div className="hero-floating-tag hero-tag-2">
                  <span>{ '{ }' }</span>
                </div>
                <div className="hero-floating-tag hero-tag-3">
                  <span>npm run dev</span>
                </div>
                <div className="hero-character-placeholder">
                  <div className="hero-code-window">
                    <div className="hero-code-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="hero-code-content">
                      <p className="code-line"><span className="code-keyword">const</span> <span className="code-var">developer</span> = {'{'}</p>
                      <p className="code-line code-indent"><span className="code-key">name</span>: <span className="code-string">"Aayush"</span>,</p>
                      <p className="code-line code-indent"><span className="code-key">passion</span>: <span className="code-string">"Building"</span>,</p>
                      <p className="code-line code-indent"><span className="code-key">coffee</span>: <span className="code-bool">true</span></p>
                      <p className="code-line">{'};'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed && !scrollHidden ? 1 : 0 }}
        transition={{ delay: isRevealed ? 1.4 : 0, duration: 0.3 }}
        style={{ pointerEvents: scrollHidden ? 'none' : 'auto' }}
      >
        <span className="hero-scroll-text">Scroll Down</span>
        <a href="#about" className="hero-scroll-arrow">
          <FiArrowDown />
        </a>
      </motion.div>
    </section>
  );
}
