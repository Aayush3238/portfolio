import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
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
          Get In <span className="gradient-text">Touch</span>
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
                  <p className="contact-detail-value">{personalInfo.linkedin.replace('https://', '')}</p>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <FaGithub className="contact-detail-icon" />
                </div>
                <div>
                  <p className="contact-detail-label">GitHub</p>
                  <p className="contact-detail-value">{personalInfo.github.replace('https://', '')}</p>
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

            <button type="submit" className={`btn btn-primary contact-submit ${submitted ? 'submitted' : ''}`}>
              {submitted ? (
                <>
                  <FaCheck /> Message Sent!
                </>
              ) : (
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
