import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ScrollToTopButton from "../components/ScrollToTopButton";
import OceanBackground from '../components/OceanBackground';
import TutorInfoCard from '../components/tutor';
import TextbookPreview from '../components/Textbook';
import Contact from '../components/Contact';

export default function Tutor() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      {/* 保留 Hero，並覆蓋家教按鈕行為 */}
        <OceanBackground />
      <main className="relative z-10">
        <Hero tutorMode={true} />
        <TutorInfoCard />
        <TextbookPreview />
        <Contact tutorMode={true} />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
