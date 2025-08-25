import Navbar from '../components/Navbar';
import OceanBackground from '../components/OceanBackground';
import DbBlogList from '../components/DbBlogList';
import UpToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';

export default function BlogOceanPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <DbBlogList />
      </main>
      <OceanBackground />
      <UpToTopButton />
    </div>
  );
}
