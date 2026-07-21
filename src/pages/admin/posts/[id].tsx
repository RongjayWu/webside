import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { postService } from '../../../services/posts/articleService';
import { categoryService} from '../../../services/posts/categoryService'; // 1. 引入分類服務
import PostForm from '../../../components/Admin/PostForm';
import { Category } from '../../../types/post'; // 2. 引入 Category 型別
import OceanBackround from '../../../components/BackgroundComponents/OceanBackground';
import ScrollToTopButton from '../../../components/PublicUI/ScrollToTopButton';
export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]); // 2. 新增分類狀態
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    async function initPage() {
      try {
        setLoading(true);
        // 3. 同時撈取文章資料與分類列表
        const [postData, categoriesData] = await Promise.all([
          postService.getPostById(id as string),
          categoryService.getCategories()
        ]);
        setPost(postData);
        setCategories(categoriesData);
      } catch (error: any) {
        console.error(error);
        alert('資料載入失敗');
      } finally {
        setLoading(false);
      }
    }

    initPage();
  }, [id]);

  const handleFormSubmit = async (formData: any) => {
  if (!id) return;
  
  try {
    setSubmitting(true);
    await postService.updatePost(id as string, formData);
    alert('文章更新成功！');
    
    // 成功後導回文章管理總列表頁面
    router.push('/admin/posts'); 
  } catch (error: any) {
    console.error('更新文章失敗:', error.message);
    alert('更新失敗: ' + error.message);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 標頭 ... */}
        <PostForm 
          initialData={post} 
          categories={categories} 
          onSubmit={handleFormSubmit} 
          loading={submitting} 
        />
      <ScrollToTopButton />
      <OceanBackround />
    </div>
  );
}