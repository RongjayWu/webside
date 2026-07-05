'use client';

import { useState, useEffect } from 'react';
import GlassCard from '../../PublicUI/GlassCard'; // 引入剛才抽出的背景組件

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('TeachingJourney');

  const navItems = [
    { id: 'TeachingJourney', label: '教學歷程' },
    { id: 'TeachingPhilosophy', label: '教學理念' },
    { id: 'TeachingApproach', label: '教學流程' },
    { id: 'Subjects', label: '授課科目' },
    { id: 'StudentGrowthStories', label: '學生故事' },
    { id: 'FeaturedTeachingCases', label: '精選案例' },
  ];

  useEffect(() => {
    // 自動高亮目前閱讀區塊的邏輯 (Intersection Observer)
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px' } // 偵測視窗中央偏上的區塊
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obj) => obj?.observer.unobserve(obj.el));
    };
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <GlassCard className="space-y-4">
      <nav className="rounded-2xl p-4 shadow-sm ">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleScroll(item.id)}
                className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-white/80 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </GlassCard>
  );
}