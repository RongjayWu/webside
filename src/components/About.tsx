import { useEffect, useRef, useState } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed">
          我是一名熱愛程式設計的工程師，擁有多年的家教經驗，喜歡學習最新技術並應用於專案中。
        </p>
      </div>
    </section>
  );
}
