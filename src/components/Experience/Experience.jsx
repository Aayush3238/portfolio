import { experience, education } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import './Experience.css';

const timeline = [
  ...experience.map((item) => ({ ...item, kind: 'work' })),
  ...education.map((item) => ({ ...item, kind: 'education', title: item.degree, date: item.date })),
];

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="section-index">
              <b>04</b> Experience
            </span>
            <h2 className="section-title">
              Where the work <em>happens.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-note">
              A production engineering team, real users on the other end, and a degree still in
              progress.
            </p>
          </Reveal>
        </header>

        <div className="exp-list">
          {timeline.map((item, i) => (
            <Reveal key={`${item.kind}-${i}`} as="article" className="exp-item">
              <div className="exp-when">
                <span className="mono exp-date">{item.date}</span>
                <span className="mono exp-kind" data-kind={item.kind}>
                  {item.kind === 'work' ? 'Work' : 'Education'}
                </span>
              </div>

              <div className="exp-main">
                <h3 className="exp-role">
                  {item.kind === 'work' ? (
                    <>
                      {item.title} <em>@ {item.company}</em>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>

                {item.kind === 'work' ? (
                  <>
                    <p className="exp-desc">{item.description}</p>
                    <ul className="exp-bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="exp-desc">
                    {item.school} <span className="exp-detail">· {item.detail}</span>
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
