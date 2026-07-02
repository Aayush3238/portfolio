import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/portfolioData';
import './Projects.css';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Some of the things I&apos;ve built
        </motion.p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              className="project-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-image-placeholder">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {project.features && project.features.length > 0 && (
                  <ul className="project-features">
                    {project.features.map((feat, fi) => (
                      <li key={fi}>{feat}</li>
                    ))}
                  </ul>
                )}

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tech-tag">{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> Code
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  ) : (
                    <span className="project-link project-link-disabled">
                      <FaExternalLinkAlt /> Live Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
