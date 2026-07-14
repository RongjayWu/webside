import Head from 'next/head';
import Navbar from '../../components/PublicUI/Navbar';
import Footer from '../../components/BackgroundComponents/Footer';
import OceanBackground from '../../components/BackgroundComponents/OceanBackground';
import ScrollToTopButton from '../../components/PublicUI/ScrollToTopButton';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>管理員後台 | Rongjay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar adminMode />
      <div className="relative overflow-hidden min-h-screen flex flex-col"> 
        <main className={`relative z-10 transition-all duration-700 flex-grow flex flex-col items-center justify-center min-h-[80vh]`}>
          <h1 className="text-4xl font-bold mb-6">管理員後台</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            歡迎來到管理員後台，您可以在此管理網站內容。
          </p>
        </main>
        <Footer />
        <ScrollToTopButton />
        <OceanBackground />
      </div>
    </>
  );
}
