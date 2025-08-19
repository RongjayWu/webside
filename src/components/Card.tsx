// 1️⃣ 定義 Card 的 props 型別
type CardProps = {
  title: string;
  description: string;
  link: string;
};

// 2️⃣ 套用型別到函式參數
export default function Card({ title, description, link }: CardProps) {
  return (
    <a
      href={link}
      className="rounded-2xl shadow-lg bg-white p-4 hover:scale-105 transition block"
    >
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </a>
  );
}
