"use client"; // 聲明這是 Client Component

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Experience as ExperienceType } from '../../types/mainInfo'; // 確保這個路徑正確指向你的 Experience 定義s

export default function Experience() {
  // 1. 設定狀態：一個用來存資料，一個用來存載入狀態
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. 使用 useEffect 在組件掛載時撈取資料
  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('experiences')
          .select('id, title, company, description, years')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setExperiences((data as ExperienceType[]) || []);
      } catch (error) {
        console.error('撈取經歷失敗:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []); // 空陣列代表只在網頁第一次載入時執行一次

  return (
    <section id="experience" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          工作經歷
        </h2>
        
        {/* 3. 處理載入中的畫面 */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">資料載入中...</p>
        ) : experiences.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">目前尚無經歷資料。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col md:flex-row items-start md:items-center text-left transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{exp.title || '無職稱'}</h3>
                  <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">
                    {exp.company || '未知公司'}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-line">
                    {exp.description || '無詳細說明'}
                  </p>
                </div>
                <div className="md:ml-8 md:text-right text-indigo-700 dark:text-indigo-400 font-bold text-lg shrink-0">
                  {exp.years || '未提供年份'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}