import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Stats from './components/Stats/Stats';
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
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <AnimatedGrid />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <TechMarquee />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
