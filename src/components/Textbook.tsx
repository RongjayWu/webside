
import textbooks from '../data/textbooks.json';

export default function TextbookPreview() {
	return (
		<section id="Textbook" className="py-24 px-4">
			<div className="max-w-6xl mx-auto">
			<h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 dark:text-indigo-400">教材預覽專區</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{textbooks.map((book, i) => (
					<div
						key={book.subject + book.title}
								className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col items-center text-center"
					>
						<h3 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">{book.subject}</h3>
						<h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">{book.title}</h4>
						<p className="text-gray-700 dark:text-gray-300 mb-6">{book.description}</p>
						<a
							href={book.url || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg shadow-md"
						>
							線上預覽教材
							<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m12 0l-4-4m4 4l-4 4" />
							</svg>
						</a>
					</div>
				))}
						</div>
					</div>
				</section>
	);
}
