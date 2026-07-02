import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import './Footer.css';

const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  ...(personalInfo.twitter ? [{ icon: FaTwitter, href: personalInfo.twitter, label: 'Twitter' }] : []),
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <a href="#home" className="footer-logo">
            <span className="gradient-text">&lt;Dev /&gt;</span>
          </a>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-socials">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="footer-social-link"
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Made with <FiHeart className="footer-heart" /> React
          </p>
        </div>
      </div>
    </footer>
  );
}
