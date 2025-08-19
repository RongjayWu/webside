import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Background from "../../components/Background";

// 型別定義
type PostData = {
  title: string;
  excerpt: string;
};

type PostProps = {
  content: string;
  data: PostData;
};

export default function Post({ content, data }: PostProps) {
  return (
    <div className="min-h-screen text-white relative">
      <Background />
      <div className="max-w-3xl mx-auto px-4 py-20 bg-black/50 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        {/* 將 className 放在外層 div，而不是 ReactMarkdown */}
        <div className="prose prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// getStaticPaths
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/blog"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));
  return { paths, fallback: false };
}

// getStaticProps
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const markdownWithMeta = fs.readFileSync(
    path.join("content/blog", slug + ".md"),
    "utf-8"
  );
  const { data, content } = matter(markdownWithMeta);

  const postData: PostData = {
    title: data.title,
    excerpt: data.excerpt || "",
  };

  return { props: { content, data: postData } };
}
