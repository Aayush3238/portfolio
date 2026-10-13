import { projects } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import './Projects.css';

const statusClass = (status) =>
  `status ${status === 'Live' ? 'status-live' : ''} work-status`;

function Featured({ project, scrollToSection }) {
  return (
    <Reveal className="work-featured">
      <article className="featured">
        <header className="featured-head">
          <span className="mono featured-kicker">Priority build</span>
          <span className={statusClass(project.status)}>{project.status}</span>
        </header>

        <div className="featured-grid">
          <div className="featured-copy">
            <span className="featured-index">01</span>
            <h3 className="featured-title">{project.title}</h3>
            <p className="featured-tagline">{project.tagline}</p>

            <div className="featured-blocks">
              <div className="featured-block">
                <span className="mono featured-label">Problem</span>
                <p>{project.problem}</p>
              </div>
              <div className="featured-block">
                <span className="mono featured-label">Approach</span>
                <p>{project.approach}</p>
              </div>
            </div>

            <ul className="featured-features">
              {project.features.map((feature) => (
                <li key={feature.text} data-status={feature.status}>
                  <span className="mono feature-status">
                    {feature.status === 'working' ? 'built' : 'planned'}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="featured-actions">
              <button className="btn btn-accent" onClick={() => scrollToSection('lab')}>
                Open the lab
              </button>
              <span className="mono featured-note">
                {project.tech.length ? project.tech.join(' · ') : 'No stack published yet'}
              </span>
            </div>
          </div>

          <div className="featured-visual">
            <ProjectVisual variant={project.visual} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Row({ project, index, flip, navigate }) {
  return (
    <Reveal as="article" className={`work-row ${flip ? 'work-row-flip' : ''}`}>
      <span className="work-row-num">{String(index).padStart(2, '0')}</span>

      <div className="work-row-body">
        <div className="work-row-meta">
          <span className={statusClass(project.status)}>{project.status}</span>
          <span className="mono work-row-year">{project.year}</span>
        </div>

        <h3 className="work-row-title">{project.title}</h3>
        <p className="work-row-tagline">{project.tagline}</p>
        <p className="work-row-problem">{project.problem}</p>

        {project.tech.length > 0 && (
          <ul className="work-row-tech">
            {project.tech.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="work-row-actions">
          <button className="arrow-link" onClick={() => navigate(`#/project/${project.slug}`)}>
            Case study <FiArrowUpRight size={14} />
          </button>
          {project.github && (
            <a
              className="arrow-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <FiGithub size={14} />
            </a>
          )}
          {project.live && (
            <a
              className="arrow-link"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live <FiArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="work-row-visual">
        <ProjectVisual variant={project.visual} />
      </div>
    </Reveal>
  );
}

export default function Projects({ navigate, scrollToSection }) {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="section-index">
              <b>01</b> Selected work
            </span>
            <h2 className="section-title">
              Shipped, built, and <em>in progress.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-note">
              Two products live in production, two AI tools built end to end, and one platform
              still being designed. Each case study states what actually works.
            </p>
          </Reveal>
        </header>

        <div className="work-list">
          {featured.map((project) => (
            <Featured key={project.slug} project={project} scrollToSection={scrollToSection} />
          ))}

          {rest.map((project, i) => (
            <Row
              key={project.slug}
              project={project}
              index={i + 2}
              flip={i % 2 === 1}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
