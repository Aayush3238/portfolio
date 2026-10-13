import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import './Nav.css';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ route, scrollToSection, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (route.name !== 'home') {
      setActive('');
      return undefined;
    }

    const ids = ['top', ...LINKS.map((link) => link.id)];
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [route.name]);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`nav ${scrolled || open ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <button
          className="nav-mark"
          onClick={() => {
            setOpen(false);
            navigate('#/');
            if (window.location.hash === '#/' || window.location.hash === '') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Back to top"
        >
          {personalInfo.initials}
        </button>

        <nav className={`nav-links ${open ? 'nav-links-open' : ''}`} aria-label="Sections">
          {LINKS.map((link, i) => (
            <button
              key={link.id}
              className={`nav-link ${active === link.id ? 'nav-link-active' : ''}`}
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
            >
              <span className="nav-link-index">{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </button>
          ))}
          <a
            className="btn btn-solid nav-resume nav-resume-mobile"
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <FiArrowUpRight size={14} />
          </a>
        </nav>

        <div className="nav-right">
          <a
            className="btn btn-solid nav-resume nav-resume-desktop"
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <FiArrowUpRight size={14} />
          </a>
          <button
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
