import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { heroHeadline, heroIntro, personalInfo } from '../../data/portfolioData';
import SystemMap from '../SystemMap/SystemMap';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];

const [line2Lead = '', line2Accent = '', line2Tail = ''] = heroHeadline.line2.split(
  /(smarter\.?)/i
);

export default function Hero({ scrollToSection }) {
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section className="hero" id="top">
      <div className="container">
        <motion.div className="hero-rail" {...rise(0.05)}>
          <span className="mono hero-rail-name">
            {personalInfo.name} <span className="hero-rail-sep">/</span> {personalInfo.role}
          </span>
          <span className="status status-live hero-rail-status">
            Open to SDE, Full-Stack &amp; AI roles
          </span>
        </motion.div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              <motion.span className="hero-line" {...rise(0.15)}>
                {heroHeadline.line1}
              </motion.span>
              <motion.span className="hero-line" {...rise(0.28)}>
                {line2Lead}
                <em>{line2Accent}</em>
                {line2Tail}
              </motion.span>
            </h1>

            <motion.p className="hero-intro" {...rise(0.42)}>
              {heroIntro}
            </motion.p>

            <motion.div className="hero-actions" {...rise(0.54)}>
              <button className="btn btn-solid" onClick={() => scrollToSection('work')}>
                Selected work <FiArrowDown size={14} />
              </button>
              <a
                className="btn btn-ghost"
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé <FiArrowUpRight size={14} />
              </a>
            </motion.div>

            <motion.ul className="hero-links" {...rise(0.66)}>
              <li>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub size={15} /> GitHub
                </a>
              </li>
              <li>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <FiLinkedin size={15} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${personalInfo.email}`}>
                  {personalInfo.email}
                </a>
              </li>
            </motion.ul>
          </div>

          <motion.div
            className="hero-visual"
            initial={reduce ? {} : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            <SystemMap />
          </motion.div>
        </div>

        <motion.div className="hero-foot" {...rise(0.8)}>
          <span className="mono">B.Tech CSE · MAIT · class of 2028</span>
          <span className="mono hero-foot-scroll">Scroll to inspect ↓</span>
          <span className="mono">Portfolio — ed. 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
