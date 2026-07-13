import { techMarquee } from '../../data/portfolioData';
import './TechMarquee.css';

export default function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];

  return (
    <div className="tech-marquee-section">
      <div className="tech-marquee-track">
        <div className="tech-marquee-content">
          {items.map((tech, i) => (
            <span className="tech-marquee-item" key={i}>
              <span className="tech-marquee-dot" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
