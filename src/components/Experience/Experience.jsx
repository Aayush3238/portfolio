import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaAward, FaTrophy, FaGraduationCap } from 'react-icons/fa';
import { experience, achievements, education, certifications, codingProfiles } from '../../data/portfolioData';
import ScrambleText from '../ScrambleText/ScrambleText';
import './Experience.css';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience & <span className="gradient-text"><ScrambleText text="Achievements" delay={100} /></span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My professional journey and milestones
        </motion.p>

        <div className="experience-grid">
          <div className="experience-column">
            <h3 className="experience-column-title">Work Experience</h3>
            <div className="timeline">
              {experience.map((exp, i) => (
                <motion.div
                  className="timeline-item"
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="timeline-dot">
                    <FaBriefcase />
                  </div>
                  <div className="timeline-content">
                    <h4>{exp.title}</h4>
                    <p className="timeline-company">{exp.company} — {exp.location}</p>
                    <p className="timeline-date">{exp.date}</p>
                    <p className="timeline-desc">{exp.description}</p>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="timeline-bullets">
                        {exp.bullets.map((bullet, bi) => (
                          <li key={bi}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {education.length > 0 && (
              <>
                <h3 className="experience-column-title" style={{ marginTop: '32px' }}>Education</h3>
                <div className="timeline">
                  {education.map((edu, i) => (
                    <motion.div
                      className="timeline-item"
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    >
                      <div className="timeline-dot timeline-dot-edu">
                        <FaGraduationCap />
                      </div>
                      <div className="timeline-content">
                        <h4>{edu.degree}</h4>
                        <p className="timeline-company">{edu.school}</p>
                        <p className="timeline-date">{edu.date}</p>
                        <p className="timeline-desc">{edu.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="experience-column">
            <h3 className="experience-column-title">Achievements</h3>
            <div className="achievements-list">
              {achievements.length > 0 ? achievements.map((ach, i) => (
                <motion.div
                  className="achievement-card"
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: -4 }}
                >
                  <div className="achievement-icon-wrapper">
                    <FaTrophy className="achievement-icon" />
                  </div>
                  <div>
                    <h4>{ach.title}</h4>
                    <p>{ach.desc}</p>
                  </div>
                </motion.div>
              )) : (
                <p className="coming-soon-text">More coming soon</p>
              )}
            </div>

            {certifications.length > 0 && (
              <>
                <h3 className="experience-column-title" style={{ marginTop: '32px' }}>Certifications</h3>
                <div className="achievements-list">
                  {certifications.map((cert, i) => (
                    <motion.div
                      className="achievement-card"
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <div className="achievement-icon-wrapper">
                        <FaAward className="achievement-icon" />
                      </div>
                      <div>
                        <h4>{cert.title}</h4>
                        <p>{cert.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {codingProfiles.length > 0 && (
              <>
                <h3 className="experience-column-title" style={{ marginTop: '32px' }}>Coding Profiles</h3>
                <div className="achievements-list">
                  {codingProfiles.map((cp, i) => (
                    <motion.div
                      className="achievement-card"
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    >
                      <div className="achievement-icon-wrapper">
                        <FaAward className="achievement-icon" />
                      </div>
                      <div>
                        <h4>{cp.title}</h4>
                        <p>{cp.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
