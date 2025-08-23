type CardProps = {
  title: string;
  description: string;
  link: string;
};

export default function Card({ title, description, link }: CardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block rounded-lg shadow-md bg-white/80 dark:bg-gray-800/80 p-6 
        transition-all duration-700 cursor-pointer transform-gpu
        hover:shadow-xl hover:scale-102 hover:-translate-y-2 
        hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
        dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:shadow-gray-700/20
        text-gray-900 dark:text-gray-100
        no-underline
      "
    >
      <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
        {description}
      </p>
      
      {/* 可選：添加外部連結指示圖標 */}
      <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span>查看詳情</span>
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
}