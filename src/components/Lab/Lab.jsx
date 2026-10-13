import { useState, useRef } from 'react';
import { workflowStages } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import './Lab.css';

export default function Lab() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const stage = workflowStages[active];

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % workflowStages.length
        : (active - 1 + workflowStages.length) % workflowStages.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="lab" className="section lab">
      <div className="container">
        <header className="section-head lab-head">
          <Reveal>
            <span className="section-index lab-index">
              <b>02</b> Inside the lab
            </span>
            <h2 className="section-title lab-title">
              An agent workflow, <em>drawn out.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-note lab-note">
              DevPilot is still being designed. This is the pipeline it is built around — click
              through the four stages to see what each one is meant to do.
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="lab-track">
          <ol className="lab-steps" aria-hidden="true">
            {workflowStages.map((item, i) => (
              <li key={item.id} className={i === active ? 'is-active' : ''} data-done={i < active}>
                <span className="lab-step-dot" />
                <span className="mono lab-step-label">
                  {item.index} {item.label}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="lab-grid">
          <div className="lab-tabs" role="tablist" aria-label="Workflow stages" onKeyDown={onKeyDown}>
            {workflowStages.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`lab-tab-${item.id}`}
                aria-selected={i === active}
                aria-controls={`lab-panel-${item.id}`}
                tabIndex={i === active ? 0 : -1}
                className={`lab-tab ${i === active ? 'lab-tab-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="mono lab-tab-index">{item.index}</span>
                <span className="lab-tab-body">
                  <span className="lab-tab-label">{item.label}</span>
                  <span className="lab-tab-title">{item.title}</span>
                </span>
              </button>
            ))}
          </div>

          <div
            className="lab-panel"
            role="tabpanel"
            id={`lab-panel-${stage.id}`}
            aria-labelledby={`lab-tab-${stage.id}`}
            key={stage.id}
          >
            <div className="lab-panel-head">
              <span className="mono lab-panel-stage">
                Stage {stage.index} / {stage.label}
              </span>
              <span className="lab-concept-chip">Concept</span>
            </div>

            <h3 className="lab-panel-title">{stage.title}</h3>
            <p className="lab-panel-desc">{stage.desc}</p>

            <div className="lab-term">
              <div className="lab-term-bar">
                <span className="mono">illustrative session</span>
                <span className="mono lab-term-note">not a running system</span>
              </div>
              <ul>
                {stage.logs.map((line, i) => (
                  <li key={line} style={{ animationDelay: `${i * 0.07}s` }}>
                    <span className={line.startsWith('$') ? 'lab-cmd' : 'lab-out'}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
