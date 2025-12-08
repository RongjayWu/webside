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
  );
}
