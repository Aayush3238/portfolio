import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { projects } from '../../data/portfolioData';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import Reveal from '../Reveal/Reveal';
import './ProjectPage.css';

export default function ProjectPage({ project, navigate }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const isInDevelopment = project.status === 'In development';

  return (
    <article className="case">
      <div className="container">
        <button className="case-back" onClick={() => navigate('#/')}>
          <FiArrowLeft size={14} /> All work
        </button>

        <header className="case-head">
          <div className="case-meta">
            <span className={`status ${project.status === 'Live' ? 'status-live' : ''}`}>
              {project.status}
            </span>
            <span className="mono case-year">{project.year}</span>
            <span className="mono case-count">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <h1 className="case-title">{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>

          <div className="case-links">
            {project.github && (
              <a
                className="arrow-link"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Repository <FiGithub size={14} />
              </a>
            )}
            {project.live && (
              <a
                className="arrow-link"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live site <FiArrowUpRight size={14} />
              </a>
            )}
            {!project.github && !project.live && (
              <span className="mono case-nolinks">No public link yet</span>
            )}
          </div>
        </header>

        {isInDevelopment && (
          <div className="case-callout">
            <span className="mono case-callout-label">Note</span>
            <p>
              This project is still in development. The capabilities listed below are design
              targets, not released features — there are no usage numbers, benchmarks or customer
              results to report.
            </p>
          </div>
        )}

        <Reveal className="case-visual">
          <ProjectVisual variant={project.visual} />
        </Reveal>

        <div className="case-grid">
          <section className="case-block">
            <span className="mono case-label">Problem</span>
            <p>{project.problem}</p>
          </section>
          <section className="case-block">
            <span className="mono case-label">Contribution &amp; decisions</span>
            <p>{project.approach}</p>
          </section>
          <section className="case-block">
            <span className="mono case-label">Outcome</span>
            <p>{project.outcome}</p>
          </section>
        </div>

        <div className="case-detail">
          <section className="case-col">
            <span className="mono case-label">Capabilities</span>
            <ul className="case-features">
              {project.features.map((feature) => (
                <li key={feature.text} data-status={feature.status}>
                  <span className="mono case-feature-status">
                    {feature.status === 'working' ? 'built' : 'planned'}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          </section>

          <section className="case-col">
            <span className="mono case-label">Implementation notes</span>
            <ul className="case-notes">
              {project.notes.map((note, i) => (
                <li key={note}>
                  <span className="mono case-note-index">{String(i + 1).padStart(2, '0')}</span>
                  {note}
                </li>
              ))}
            </ul>

            <span className="mono case-label case-label-space">Stack</span>
            {project.tech.length > 0 ? (
              <ul className="case-tech">
                {project.tech.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="case-tech-empty">Not published yet — this one is still a design.</p>
            )}
          </section>
        </div>

        <button className="case-next" onClick={() => navigate(`#/project/${next.slug}`)}>
          <span className="mono case-next-label">Next project</span>
          <span className="case-next-title">
            {next.title} <FiArrowRight size={22} />
          </span>
        </button>
      </div>
    </article>
  );
}
