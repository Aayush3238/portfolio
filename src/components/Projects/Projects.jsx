import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/portfolioData';
import './Projects.css';

function ProjectCard({ project, index, isInView }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg) translateY(-8px)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
      }}
    >
      <div className="project-card-glow" style={{
        opacity: isHovered ? 1 : 0,
        background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(108, 99, 255, 0.15), transparent 60%)`,
      }} />

      <div className="project-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="project-image-placeholder">
            <div className="project-image-icon">
              {project.title === 'PixelFlow' ? (
                <svg viewBox="0 0 80 80" width="60" height="60">
                  <rect x="10" y="10" width="25" height="25" rx="4" fill="rgba(108,99,255,0.3)" />
                  <rect x="45" y="10" width="25" height="25" rx="4" fill="rgba(233,66,245,0.3)" />
                  <rect x="10" y="45" width="25" height="25" rx="4" fill="rgba(233,66,245,0.2)" />
                  <rect x="45" y="45" width="25" height="25" rx="4" fill="rgba(108,99,255,0.2)" />
                  <circle cx="40" cy="40" r="8" fill="rgba(108,99,255,0.5)" />
                </svg>
              ) : (
                <svg viewBox="0 0 80 80" width="60" height="60">
                  <path d="M40 10 L70 30 L70 60 L40 75 L10 60 L10 30 Z" fill="none" stroke="rgba(108,99,255,0.4)" strokeWidth="2" />
                  <path d="M25 45 L35 35 L45 42 L55 30" fill="none" stroke="rgba(233,66,245,0.5)" strokeWidth="2" />
                  <circle cx="40" cy="40" r="5" fill="rgba(108,99,255,0.5)" />
                </svg>
              )}
            </div>
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
  );
}

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
            <ProjectCard key={i} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
