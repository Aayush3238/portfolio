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
import CursorSpotlight from './components/CursorSpotlight/CursorSpotlight';
import StatusBar from './components/StatusBar/StatusBar';
import SectionReveal from './components/SectionReveal/SectionReveal';
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
        <SectionReveal variant="fadeUp">
          <About />
        </SectionReveal>
        <SectionReveal variant="diagonalWipe">
          <TechMarquee />
        </SectionReveal>
        <SectionReveal variant="scaleIn">
          <Skills />
        </SectionReveal>
        <SectionReveal variant="slideFromBottom">
          <Projects />
        </SectionReveal>
        <SectionReveal variant="fadeLeft">
          <Experience />
        </SectionReveal>
        <SectionReveal variant="fadeRight">
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
      <LoadingScreen onComplete={handleLoadComplete} />
      <EasterEgg />
    </>
  );
}
