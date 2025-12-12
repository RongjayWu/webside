import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OceanBackground from '../../components/OceanBackground';

export default function AdminHome() {
  return (
    <>
      <Head>
        <title>管理員後台 | Rongjay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar adminMode />
      <div className="relative overflow-hidden min-h-screen flex flex-col"> 
        <OceanBackground />
        <Footer />
      </div>
    </>
  );
}
