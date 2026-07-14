import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Article } from '../types/post' // 引入 Post 型別

export default function BlogList() {

  const [posts, setPosts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchPosts() {

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', {
          ascending: false
        })

      if (!error && data) {
        setPosts(data as Article[])
      }

      setLoading(false)
    }

    fetchPosts()

  }, [])


  if (loading) {
    return (
      <section>
        <p>文章載入中...</p>
      </section>
    )
  }


  return (
    <section>
      <h2>最新文章</h2>
      {posts.map((post) => (
        <article key={post.id}>
            <link rel="canonical" href={`/blog/${post.slug}`} />
                <h3>{post.title}</h3>
            <link/>
            <p>
                {post.summary}
            </p>
            <small>
                瀏覽數：{post.view_count}
            </small>
        </article>
      ))}
    </section>
  )
}