import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiLoader, FiCopy } from 'react-icons/fi';
import { personalInfo, socials } from '../../data/portfolioData';
import Reveal from '../Reveal/Reveal';
import './Contact.css';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <Reveal>
          <span className="section-index">
              <b>06</b> Contact
          </span>
        </Reveal>

        <div className="contact-head">
          <motion.h2
            className="contact-title"
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s build something <em>that lasts.</em>
          </motion.h2>

          <motion.div
            className="contact-side"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="status status-live">Open to SDE, Full-Stack &amp; AI roles</span>
            <p>
              Internship, full-time role, or a product that needs building — send a note and I&apos;ll
              reply.
            </p>
          </motion.div>
        </div>

        <div className="contact-grid">
          <Reveal className="contact-direct">
            <span className="mono contact-label">Direct</span>
            <button
              className="contact-email"
              onClick={copyEmail}
              title="Copy email address"
              type="button"
            >
              {personalInfo.email}
              <FiCopy className="contact-email-icon" size={18} aria-hidden="true" />
            </button>
            <span className={`mono contact-copied ${copied ? 'is-on' : ''}`} role="status">
              {copied ? 'Copied to clipboard' : ' '}
            </span>

            <ul className="contact-socials">
              {socials.map((social) => (
                <li key={social.key}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <span className="mono contact-social-index">
                      {social.label === 'GitHub'
                        ? '01'
                        : social.label === 'LinkedIn'
                          ? '02'
                          : '03'}
                    </span>
                    <span className="contact-social-label">{social.label}</span>
                    <span className="contact-social-handle">
                      {social.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </span>
                    <FiArrowUpRight size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="contact-form-wrap">
            <span className="mono contact-label">Or send a message</span>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="What are you building?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn contact-submit ${status === 'sent' ? 'is-sent' : ''} ${
                  status === 'error' ? 'is-error' : ''
                }`}
                disabled={status === 'sending'}
              >
                {status === 'sending' && (
                  <>
                    <FiLoader className="contact-spin" /> Sending
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <FiCheck /> Message sent
                  </>
                )}
                {status === 'error' && <>Something failed — email me instead</>}
                {status === 'idle' && <>Send message</>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
