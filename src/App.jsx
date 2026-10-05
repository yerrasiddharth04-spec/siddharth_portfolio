import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudy from './components/CaseStudy';
import { getCaseStudy } from './data/caseStudies';
import NetflixPreloader from './components/NetflixPreloader';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const parseSlug = () => {
  const m = window.location.hash.match(/^#\/case-study\/([\w-]+)/);
  return m && getCaseStudy(m[1]) ? m[1] : null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState(parseSlug);

  // Hash routing: #/case-study/<slug> shows a case-study page, anything else shows the home page.
  useEffect(() => {
    const onHash = () => setSlug(parseSlug());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // After coming back from a case study, return to the section the link pointed at.
  useEffect(() => {
    if (slug) return;
    const hash = window.location.hash;
    if (!hash || hash.startsWith('#/')) return;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      document.querySelector(hash)?.scrollIntoView();
    }, 250);
    return () => clearTimeout(t);
  }, [slug]);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative cursor-none selection:bg-red-600 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
      <CustomCursor />

      {/* Light/Dark theme toggle */}
      <ThemeToggle />

      {slug ? (
        <CaseStudy slug={slug} />
      ) : (
        <>
          <Hero />
          <About />
          <Expertise />
          <Experience />
          <Achievements />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;