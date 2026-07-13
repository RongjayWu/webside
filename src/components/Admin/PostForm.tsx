import { useState } from 'react';

type Category = { id: number; name: string };

export type PostFormProps = {
  categories: Category[];
  onSubmit: (data: { title: string; content: string; author: string; categoryId: string }) => Promise<void>;
  error?: string;
  onSuccess?: () => void;
};

export default function PostForm({ categories, onSubmit, error, onSuccess }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ title, content, author, categoryId });
    setSubmitting(false);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden mb-8">
      <div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center tracking-tight">發布新文章</h2>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="標題"
          required
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="作者"
          required
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 md:col-span-2"
        >
          <option value="">請選擇分類</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="內容"
        required
        rows={6}
        className="mb-4 w-full p-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 font-semibold tracking-wide shadow hover:scale-105 transition-all"
        disabled={submitting}
      >
        {submitting ? '發布中...' : '發布'}
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </form>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
    </div>
  );
}
