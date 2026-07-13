"use client"; // 聲明這是 Client Component

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ClubType } from "../../types/mainInfo"; // 確保這個路徑正確指向你的 ClubType 定義

export default function Club() {
  // 1. 設定狀態
  const [clubs, setClubs] = useState<ClubType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. 使用 useEffect 撈取 Supabase 資料
  useEffect(() => {
    async function fetchClubs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("clubs") // 確保與你的 Supabase 資料表名稱一致
          .select("id, title, club, description")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setClubs((data as ClubType[]) || []);
      } catch (error) {
        console.error("撈取社團經歷失敗:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  return (
    <section id="club" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400">
          社團經歷
        </h2>

        {/* 3. 處理狀態渲染 */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">資料載入中...</p>
        ) : clubs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">目前尚無社團經歷資料。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clubs.map((exp) => (
              <div
                // 修正：改用資料庫自帶且不重複的 exp.id 作為 key
                key={exp.id}
                className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col md:flex-row items-start md:items-center text-left transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{exp.title || "無職稱"}</h3>
                  <div className="text-lg font-medium mb-2 text-purple-600 dark:text-purple-400">
                    {exp.club || "未知社團"}
                  </div>
                  {/* 使用 whitespace-pre-line 支援後台輸入的換行符號 */}
                  <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-line">
                    {exp.description || "無詳細說明"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}