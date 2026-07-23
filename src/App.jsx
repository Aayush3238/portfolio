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
import StatusBar from './components/StatusBar/StatusBar';
import CursorSpotlight from './components/CursorSpotlight/CursorSpotlight';
import EasterEgg from './components/EasterEgg/EasterEgg';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      <CursorSpotlight />
      <StatusBar />
      <ScrollProgress />
      <AnimatedGrid />
      <Navbar />
      <main id="main-content">
        <Hero isRevealed={heroReady} />
        <About />
        <TechMarquee />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <LoadingScreen onComplete={handleLoadComplete} />
      <EasterEgg />
    </>
  );
}
