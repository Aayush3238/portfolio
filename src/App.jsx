import { useState, useEffect, useCallback } from 'react';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Lab from './components/Lab/Lab';
import Profile from './components/Profile/Profile';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectPage from './components/ProjectPage/ProjectPage';
import { projects } from './data/portfolioData';

const BASE_TITLE = 'Aayush Kumar | Full Stack Software Engineer';

function parseRoute(hash) {
  const match = /^#\/project\/([a-z0-9-]+)/i.exec(hash || '');
  if (match) {
    const slug = match[1].toLowerCase();
    const project = projects.find((p) => p.slug === slug);
    if (project) return { name: 'project', slug, project };
  }
  return { name: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const isProject = /^#\/project\//.test(hash);
    const sectionId = /^#([a-z-]+)$/i.exec(hash)?.[1];
    const section = sectionId ? document.getElementById(sectionId) : null;

    if (section) {
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      section.scrollIntoView({ block: 'start' });
      root.style.scrollBehavior = prev;
    } else if (isProject || !hash || hash === '#/') {
      window.scrollTo(0, 0);
    }

    document.title =
      route.name === 'project' ? `${route.project.title} | Aayush Kumar` : BASE_TITLE;
  }, [route]);

  const navigate = useCallback((hash) => {
    if (window.location.hash === hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      if (route.name !== 'home') {
        navigate('#/');
        setTimeout(scroll, 90);
      } else {
        scroll();
      }
    },
    [route.name, navigate]
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav route={route} scrollToSection={scrollToSection} navigate={navigate} />

      <main id="main-content">
        {route.name === 'project' ? (
          <ProjectPage project={route.project} navigate={navigate} />
        ) : (
          <>
            <Hero scrollToSection={scrollToSection} />
            <Projects navigate={navigate} scrollToSection={scrollToSection} />
            <Lab />
            <Profile />
            <Experience />
            <Contact />
          </>
        )}
      </main>

      <Footer scrollToSection={scrollToSection} />
    </>
  );
}
