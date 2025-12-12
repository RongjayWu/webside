import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Club from '../components/Club';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import DbBlogList from '../components/DbBlogList';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import ScrollToTopButton from "../components/ScrollToTopButton";
import OceanBackground from '../components/OceanBackground';
import Footer from '../components/Footer';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import Education from '../components/Education';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  // 首頁掛載時偵測 hash 並自動滾動
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Rongjay</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div className="relative overflow-hidden">
      {/* <Background /> */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Club />
        <Portfolio />
        <Contact tutorMode={false}/>
        <Footer />
        <OceanBackground />
      </main>
      <ScrollToTopButton />
      
    </div>
    </>
  );
}
