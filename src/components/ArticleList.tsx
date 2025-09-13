import React from 'react';

type Article = {
  id: number;
  title: string;
  createdAt: string;
};

type Props = {
  articles: Article[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ArticleList({ articles, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden mb-8">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
        <div className="p-6 sm:p-8 md:p-10">
          <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">文章列表</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100 text-sm md:text-base ">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left font-semibold w-20">編號</th>
                  <th className="px-4 py-2 text-left font-semibold">標題</th>
                  <th className="px-4 py-2 text-left font-semibold">發布日期</th>
                  <th className="px-4 py-2 text-right font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400 dark:text-gray-500">目前沒有文章資料。</td>
                  </tr>
                )}
                {articles.map((article, idx) => (
                  <tr key={article.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-4 py-2 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-4 py-2 break-all max-w-xs md:max-w-md">{article.title}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded shadow hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 font-semibold tracking-wide transition-all"
                          onClick={() => onEdit(article.id)}
                        >編輯</button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-semibold transition-all"
                          onClick={() => onDelete(article.id)}
                        >刪除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
      </div>
    </div>
  );
}
