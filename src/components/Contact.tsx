export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 text-center opacity-0 transform animate-fadeInUp"
      style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
    >
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <a
        href="mailto:example@email.com"
        className="px-6 py-3 bg-blue-500 text-white rounded shadow transform transition hover:scale-105 hover:bg-blue-600"
      >
        Send Email
      </a>
    </section>
  );
}
