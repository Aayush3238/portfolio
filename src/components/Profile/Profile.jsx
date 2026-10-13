import { skillGroups, principles, education } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import './Profile.css';

const FACTS = [
  { label: 'Education', value: `${education[0].degree}, ${education[0].school}` },
  { label: 'Graduating', value: '2028 · CGPA 8.28/10' },
  { label: 'Based in', value: 'India · working remote' },
  { label: 'Now', value: 'Software Developer Intern @ Nexera' },
];

export default function Profile() {
  return (
    <section id="profile" className="section profile">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="section-index">
              <b>03</b> Profile
            </span>
            <h2 className="section-title">
              Building useful things, <em>end to end.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-note">
              I care about the whole path — data model, API contract, interface, and the moment a
              feature meets a real user.
            </p>
          </Reveal>
        </header>

        <div className="profile-grid">
          <Reveal className="profile-about">
            <p className="profile-lead">
              I&apos;m a computer science student at MAIT and a full-stack engineer who prefers
              shipping to speculating.
            </p>
            <p className="profile-body">
              Most of my work lands in the same place: a backend with clear contracts, an interface
              that stays out of the way, and — increasingly — AI features that earn their spot
              rather than being bolted on. I&apos;m currently exploring how agents and retrieval
              fit into everyday developer tools, which is what DevPilot is for.
            </p>

            <dl className="profile-facts">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="mono">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="profile-skills">
            {skillGroups.map((group, i) => (
              <Reveal key={group.id} delay={0.08 * i} className="skill-group">
                <header className="skill-head">
                  <span className="mono skill-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{group.title}</h3>
                </header>
                {group.note && <p className="skill-note">{group.note}</p>}
                <ul className="skill-items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="principles">
          <span className="mono principles-label">How I work</span>
          <ul>
            {principles.map((principle, i) => (
              <li key={principle.title}>
                <span className="mono principle-index">{String(i + 1).padStart(2, '0')}</span>
                <h4>{principle.title}</h4>
                <p>{principle.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
