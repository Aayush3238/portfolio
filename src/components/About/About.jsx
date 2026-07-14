import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaRocket, FaDatabase } from 'react-icons/fa';
import { aboutParagraphs, highlights, education } from '../../data/portfolioData';
import './About.css';

const iconMap = { FaCode, FaRocket, FaDatabase };

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get to know me better
        </motion.p>

        <div className="about-grid">
          <motion.div
            className="about-image-section"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-card">
              <div className="about-image-placeholder">
                <div className="about-avatar-ring">
                  <div className="about-avatar-inner">
                    <FaCode className="about-avatar-icon" />
                  </div>
                </div>
                <p className="about-avatar-name">Aayush Kumar</p>
                <p className="about-avatar-role">Full Stack Developer</p>
              </div>
            </div>

            {education.length > 0 && (
              <div className="about-education">
                <h4 className="about-edu-title">Education</h4>
                {education.map((edu, i) => (
                  <div key={i} className="about-edu-item">
                    <p className="about-edu-degree">{edu.degree}</p>
                    <p className="about-edu-school">{edu.school}</p>
                    <p className="about-edu-detail">{edu.date} — {edu.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {aboutParagraphs.map((text, i) => (
              <p className="about-text" key={i}>{text}</p>
            ))}

            <div className="about-highlights">
              {highlights.map((item, i) => {
                const Icon = iconMap[item.icon] || FaCode;
                return (
                  <motion.div
                    className="about-highlight-card"
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                  >
                    <div className="about-highlight-icon-wrapper">
                      <Icon className="about-highlight-icon" />
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
