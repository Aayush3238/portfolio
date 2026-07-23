import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheck, FaSpinner } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import ScrambleText from '../ScrambleText/ScrambleText';
import './Contact.css';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mojgjewk';

function extractUsername(url, platform) {
  try {
    const parsed = new URL(url);
    if (platform === 'github') {
      const parts = parsed.pathname.split('/').filter(Boolean);
      return parts[0] || '';
    }
    if (platform === 'linkedin') {
      const parts = parsed.pathname.split('/').filter(Boolean);
      const inIndex = parts.indexOf('in');
      return parts[inIndex + 1]?.replace(/\/$/, '') || '';
    }
  } catch {
    return '';
  }
  return '';
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="gradient-text"><ScrambleText text="Touch" delay={100} /></span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a project in mind? Let&apos;s work together!
        </motion.p>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Let&apos;s talk</h3>
            <p className="contact-info-text">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="contact-details">
              <a href={`mailto:${personalInfo.email}`} className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <FaEnvelope className="contact-detail-icon" />
                </div>
                <div>
                  <p className="contact-detail-label">Email</p>
                  <p className="contact-detail-value">{personalInfo.email}</p>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <FaLinkedin className="contact-detail-icon" />
                </div>
                <div>
                  <p className="contact-detail-label">LinkedIn</p>
                  <p className="contact-detail-value">@{extractUsername(personalInfo.linkedin, 'linkedin')}</p>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <FaGithub className="contact-detail-icon" />
                </div>
                <div>
                  <p className="contact-detail-label">GitHub</p>
                  <p className="contact-detail-value">@{extractUsername(personalInfo.github, 'github')}</p>
                </div>
              </a>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <FiMapPin className="contact-detail-icon" />
                </div>
                <div>
                  <p className="contact-detail-label">Location</p>
                  <p className="contact-detail-value">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary contact-submit ${status === 'sent' ? 'submitted' : ''} ${status === 'error' ? 'error' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' && (
                <>
                  <FaSpinner className="spinner" /> Sending...
                </>
              )}
              {status === 'sent' && (
                <>
                  <FaCheck /> Message Sent!
                </>
              )}
              {status === 'error' && (
                <>Failed. Try Again</>
              )}
              {(status === 'idle') && (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
