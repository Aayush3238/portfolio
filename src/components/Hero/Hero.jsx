import { motion } from 'framer-motion';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { personalInfo, heroIntro } from '../../data/portfolioData';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg-gradient" />
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.p>

          <h1 className="hero-name">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <h2 className="hero-role">{personalInfo.role}</h2>

          <p className="hero-intro">{heroIntro}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <FiArrowDown />
            </a>
            <a href={personalInfo.resumePath} download className="btn btn-secondary">
              Download Resume
              <FiDownload />
            </a>
          </div>

          <div className="hero-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="hero-image-card">
            <div className="hero-image-placeholder">
              {/* REPLACE: Put your profile image in public/ folder and use: <img src="/profile.jpg" alt="Profile" /> */}
              <span>👨‍💻</span>
              <p>Aayush Kumar</p>
            </div>
            <div className="hero-image-ring" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <a href="#about">
          <FiArrowDown className="bounce" />
        </a>
      </motion.div>
    </section>
  );
}
