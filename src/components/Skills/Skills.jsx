import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '../../data/portfolioData';
import './Skills.css';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Technologies and tools I work with
        </motion.p>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              className="skill-category"
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + catIndex * 0.08 }}
            >
              <div className="skill-category-glow" />
              <h3 className="skill-category-title">
                <span className="skill-category-icon-dot" />
                {category.title}
              </h3>
              <div className="skill-items">
                {category.skills.map((skill, sIndex) => (
                  <motion.div
                    className="skill-item"
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + catIndex * 0.08 + sIndex * 0.04 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <skill.icon style={{ color: skill.color, fontSize: '1.4rem' }} />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
