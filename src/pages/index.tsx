import Head from 'next/head';
import Hero from '../components/MainInfo/Hero';
import About from '../components/MainInfo/About';
import Skills from '../components/MainInfo/Skills';
import Club from '../components/MainInfo/Club';
import Experience from '../components/MainInfo/Experience';
import Portfolio from '../components/MainInfo/Portfolio';
import Education from '../components/MainInfo/Education';
import Contact from '../components/PublicUI/Contact';
import Navbar from '../components/PublicUI/Navbar';
import ScrollToTopButton from '../components/PublicUI/ScrollToTopButton';
import DeepSeaBackground from '../components/BackgroundComponents/DeepSeaBackground';
import HomeIntroOverlay from '../components/BackgroundComponents/HomeIntroOverlay';
import Footer from '../components/BackgroundComponents/Footer';
import { useEffect } from 'react';
import { useSessionIntro } from '../hooks/useSessionIntro';
interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const { mode, phase, isIntroPlaying, finishIntro } = useSessionIntro();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.homeIntro = isIntroPlaying ? 'blocked' : 'ready';

    return () => {
      delete document.documentElement.dataset.homeIntro;
    };
  }, [isIntroPlaying]);

  useEffect(() => {
    if (typeof window === 'undefined' || phase !== 'done' || !window.location.hash) {
      return;
    }

    const handle = window.setTimeout(() => {
      const el = document.getElementById(window.location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => window.clearTimeout(handle);
  }, [phase]);

  return (
    <>
      <Head>
        <title>蒼海迴響 - Rongcean</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div className="relative overflow-hidden">
        <Navbar />
        <DeepSeaBackground />
        <main className={`relative z-10 transition-all duration-700 ${isIntroPlaying ? 'pointer-events-none opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Club />
          <Portfolio />
          <Contact tutorMode={false} />
          <Footer />
        </main>
        <ScrollToTopButton />
        <HomeIntroOverlay mode={mode} active={isIntroPlaying} onComplete={finishIntro} />
      </div>
    </>
  );
}
