import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { skillGroups, personalInfo } from '../../data/portfolioData';
import './Strengths.css';

const { githubUsername, leetcodeUsername, github, leetcode } = personalInfo;

export default function Strengths() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section id="strengths" className="section strengths" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-label">Technical strengths</span>
            <h2 className="section-title">What I work with</h2>
          </div>
          <p className="section-intro">
            The tools and fundamentals I reach for when building and debugging
            products.
          </p>
        </div>

        <div className="strengths-grid">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.id}
              className={`strength-card ${group.todo ? 'strength-card-todo' : ''}`}
              {...rise(0.08 + i * 0.07)}
            >
              <div className="strength-head">
                <span className="strength-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{group.title}</h3>
              </div>
              <ul className="strength-items">
                {group.items.map((item) => (
                  <li key={item} className={group.todo ? 'strength-item-todo' : ''}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="activity-card" {...rise(0.4)}>
          <div className="activity-head">
            <div>
              <span className="mono-kicker">Coding activity</span>
              <h3 className="activity-title">Contributions across platforms</h3>
            </div>
            <div className="activity-links">
              <a href={github} target="_blank" rel="noopener noreferrer">
                GitHub <FiArrowUpRight size={14} />
              </a>
              <a href={leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode <FiArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="activity-chart">
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt={`${githubUsername}'s GitHub contribution chart`}
              loading="lazy"
            />
          </div>

          <div className="activity-grid">
            <div className="activity-tile">
              <img
                src={`https://streak-stats.demolab.com/?user=${githubUsername}&theme=dark&hide_border=true`}
                alt={`${githubUsername}'s GitHub streak`}
                loading="lazy"
              />
            </div>
            <div className="activity-tile">
              <img
                src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?ext=activity&theme=dark`}
                alt={`${leetcodeUsername}'s LeetCode stats`}
                loading="lazy"
              />
            </div>
          </div>

          <div className="activity-heatmap">
            <img
              src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?ext=heatmap&theme=dark`}
              alt={`${leetcodeUsername}'s LeetCode submission heatmap`}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
