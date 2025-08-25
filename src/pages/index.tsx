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
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
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
        <Experience />
        <Club />
        <Skills />
        <Portfolio />
        <Contact tutorMode={false}/>
        <OceanBackground />
      </main>
      <ScrollToTopButton />
    </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDir);

  const posts: Post[] = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      excerpt: data.excerpt,
    };
  });

  return { props: { posts } };
};
