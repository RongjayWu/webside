export interface Post {
  id: string
  slug: string
  title: string
  summary: string | null
  content: string | null
  cover_image: string | null
  status: string
  featured: boolean
  view_count: number
  meta_title: string | null
  meta_description: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}