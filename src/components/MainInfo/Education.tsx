"use client"; // 聲明這是 Client Component

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { EducationType } from "../../types/mainInfo"; // 確保這個路徑正確指向你的 EducationType 定義

// 獨立卡片組件，容錯處理避免 null 值造成畫面崩潰
const EducationCard: React.FC<{
  degree: string | null;
  department: string | null;
  period: string | null;
}> = ({ degree, department, period }) => (
  <div
    className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col items-start text-left transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
  >
    <h3 className="text-2xl font-semibold mb-2">{degree || "未提供學位"}</h3>
    <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">
      {department || "未提供科系"}
    </div>
    <div className="mt-6 w-full text-right text-indigo-700 dark:text-indigo-400 font-bold text-lg">
      {period || "未提供修業期間"}
    </div>
  </div>
);

const Education: React.FC = () => {
  // 1. 設定狀態
  const [educations, setEducations] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. 使用 useEffect 撈取 Supabase 資料
  useEffect(() => {
    async function fetchEducations() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("educations") // 確保與你的 Supabase 資料表名稱一致
          .select("id, degree, department, period")
          .order("created_at", { ascending: false }); // 依建立時間排序

        if (error) {
          throw error;
        }

        setEducations((data as EducationType[]) || []);
      } catch (error) {
        console.error("撈取學歷失敗:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEducations();
  }, []);

  return (
    <section id="education" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          求學經歷
        </h2>

        {/* 3. 處理狀態渲染 */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">資料載入中...</p>
        ) : educations.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">目前尚無求學經歷資料。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educations.map((edu) => (
              // 修正：使用資料庫的 edu.id 作為絕對不重複的 key
              <EducationCard key={edu.id} {...edu} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;