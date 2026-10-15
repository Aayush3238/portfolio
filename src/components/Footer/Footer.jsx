import { FiArrowUp, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import { personalInfo, socials } from '../../data/portfolioData';
import './Footer.css';

const SECTIONS = ['work', 'lab', 'profile', 'experience', 'activity', 'contact'];

export default function Footer({ scrollToSection }) {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-mark">{personalInfo.initials}</span>
            <div>
              <p className="footer-name">{personalInfo.name}</p>
              <p className="mono footer-role">{personalInfo.role} · MAIT &apos;28</p>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer sections">
            {SECTIONS.map((id, i) => (
              <button key={id} onClick={() => scrollToSection(id)}>
                <span className="mono footer-nav-index">{String(i + 1).padStart(2, '0')}</span>
                {id}
              </button>
            ))}
          </nav>

          <div className="footer-socials">
            {socials.map((social) => {
              const Icon =
                social.key === 'github'
                  ? FiGithub
                  : social.key === 'linkedin'
                    ? FiLinkedin
                    : FiArrowUpRight;
              return (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <Icon size={17} />
                </a>
              );
            })}
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              @
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mono">
            © {new Date().getFullYear()} {personalInfo.name} — React, Vite &amp; framer-motion
          </p>
          <p className="mono footer-type">
            Bodoni Moda / Hanken Grotesk / JetBrains Mono
          </p>
          <button className="footer-top-btn" onClick={goTop}>
            Back to top <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
