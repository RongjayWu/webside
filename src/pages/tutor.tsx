import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ScrollToTopButton from "../components/ScrollToTopButton";
import OceanBackground from '../components/OceanBackground';
import TutorInfoCard from '../components/tutor';
import TextbookPreview from '../components/Textbook';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Tutor() {
  return (
    <>
      <Head>
        <title>Rongjay | 家教資訊</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />
        <OceanBackground />
        <main className="relative z-10">
          <TutorInfoCard />
          <TextbookPreview />
          <Contact tutorMode={true} />
          <Footer />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}
