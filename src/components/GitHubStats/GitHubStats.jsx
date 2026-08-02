import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolioData';
import ScrambleText from '../ScrambleText/ScrambleText';
import './GitHubStats.css';

const GITHUB_USERNAME = 'Aayush3238';
const LEETCODE_USERNAME = 'kumar_aayussh';

export default function GitHubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="github" className="section github-stats" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Open Source <span className="gradient-text"><ScrambleText text="Activity" delay={100} /></span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My coding contributions across platforms
        </motion.p>

        <motion.div
          className="github-chart-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="github-chart-card">
            <div className="github-chart-label">
              <FaGithub className="github-chart-icon" />
              <span>GitHub Contributions</span>
            </div>
            <img
              src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
              className="github-chart-img"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="github-stats-grid">
          <motion.div
            className="github-stats-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=dark&hide_border=true`}
              alt={`${GITHUB_USERNAME}'s GitHub streak stats`}
              className="github-streak-img"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="github-stats-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <img
              src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?ext=activity&theme=dark`}
              alt={`${LEETCODE_USERNAME}'s LeetCode stats`}
              className="leetcode-card-img"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          className="leetcode-calendar-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="leetcode-calendar-header">
            <div className="leetcode-calendar-title">
              <span className="leetcode-dot" />
              <span>LeetCode Submissions</span>
            </div>
            <span className="leetcode-calendar-year">{new Date().getFullYear()}</span>
          </div>
          <div className="leetcode-heatmap-card">
            <img
              src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?ext=heatmap&theme=dark`}
              alt={`${LEETCODE_USERNAME}'s LeetCode submission heatmap`}
              className="leetcode-heatmap-img"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          className="github-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <FaGithub className="github-cta-icon" />
            <span>GitHub Profile</span>
            <FaExternalLinkAlt className="github-cta-ext" />
          </a>
          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn leetcode-cta"
          >
            <span className="leetcode-cta-icon">LC</span>
            <span>LeetCode Profile</span>
            <FaExternalLinkAlt className="github-cta-ext" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
