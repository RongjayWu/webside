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

export default function Home() {
  return (
    <>
      <Head>
        <title>Rongjay</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div className="relative overflow-hidden">
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Club />
          <Skills />
          <Portfolio />
          <DbBlogList />
          <Contact tutorMode={false}/>
          <OceanBackground />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}
