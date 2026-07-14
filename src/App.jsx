import { useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import TechMarquee from './components/TechMarquee/TechMarquee';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import AnimatedGrid from './components/AnimatedGrid/AnimatedGrid';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <div className={`app-content ${loaded ? 'app-revealed' : ''}`}>
        <ScrollProgress />
        <AnimatedGrid />
        <Navbar />
        <main>
          <Hero isRevealed={loaded} />
          <About />
          <TechMarquee />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
