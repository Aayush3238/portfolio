import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/portfolioData';
import ScrambleText from '../ScrambleText/ScrambleText';
import './Projects.css';

function ProjectDetail({ project, index, isActive }) {
  return (
    <motion.div
      className={`project-detail ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40%' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="project-detail-header">
        <span className="project-index">0{index + 1}</span>
        <h3 className="project-detail-title">{project.title}</h3>
      </div>
      <p className="project-detail-desc">{project.description}</p>

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
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const details = document.querySelectorAll('.project-detail');
      details.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.3) {
          setActiveIndex(i);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My <span className="gradient-text"><ScrambleText text="Projects" delay={100} /></span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Some of the things I&apos;ve built
        </motion.p>

        <div className="projects-showcase">
          <div className="projects-scroll-list">
            {projects.map((project, i) => (
              <ProjectDetail
                key={i}
                project={project}
                index={i}
                isActive={activeIndex === i}
              />
            ))}
          </div>

          <div className="projects-sticky-preview">
            <div className="preview-frame">
              <div className="preview-frame-header">
                <div className="preview-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="preview-url">{projects[activeIndex]?.live ? new URL(projects[activeIndex].live).hostname : 'localhost'}</span>
              </div>
              <div className="preview-body">
                {projects[activeIndex]?.live ? (
                  <iframe
                    key={activeIndex}
                    src={projects[activeIndex].live}
                    title={`${projects[activeIndex].title} preview`}
                    className="preview-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="preview-placeholder">
                    <FaExternalLinkAlt />
                    <span>No live preview</span>
                  </div>
                )}
              </div>
              <div className="preview-project-indicator">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`indicator-dot ${activeIndex === i ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
