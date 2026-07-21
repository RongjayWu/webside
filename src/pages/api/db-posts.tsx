// // src/pages/api/db-posts.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { supabaseAdmin as supabase } from '../../lib/adminsupbase'; // 🚀 請確認此路徑與檔名 correct

// // 自動產生 Slug 輔助函式
// const generateSlug = (text: string) => {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
//     .replace(/[\s_-]+/g, '-');
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req;

//   try {
//     switch (method) {
//       // ----------------------------------------------------
//       // 1. 獲取文章列表 (包含多對多標籤關聯)
//       // ----------------------------------------------------
//       case 'GET': {
//         const { id } = req.query;

//         // 1. 建立基本查詢（包含多對多標籤關聯）
//         let query = supabase
//           .from('posts')
//           .select(`*, post_tags ( tags ( name ) )`)
//           .order('created_at', { ascending: false });

//         // 2. 如果網址中有帶 id 參數 (/api/db-posts?id=xxx)，則只過濾該篇文章
//         if (id) {
//           query = query.eq('id', id as string);
//         }

//         const { data, error } = await query;
//         if (error) throw error;

//         // 3. 整理關聯標籤格式為 ['React', 'Next.js']
//         const formatted = (data || []).map((p) => ({
//           ...p,
//           tags: p.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || [],
//         }));

//         // 4. 若為單篇查詢直接回傳物件，否則回傳文章陣列
//         if (id) {
//           return res.status(200).json(formatted[0] || null);
//         }

//         return res.status(200).json(formatted);
//       }

//       // ----------------------------------------------------
//       // 2. 新增文章 (自動處理標籤與中間表)
//       // ----------------------------------------------------
//       case 'POST': {
//         const { tags, ...postData } = req.body;

//         // 寫入文章主體
//         const { data: post, error: postError } = await supabase
//           .from('posts')
//           .insert([postData])
//           .select('id')
//           .single();

//         if (postError) throw postError;

//         // 寫入標籤關聯
//         if (Array.isArray(tags) && tags.length > 0) {
//           for (const tagName of tags) {
//             const tagSlug = generateSlug(tagName);

//             // Upsert 標籤 (存在則跳過/取得 ID，不存在則建立)
//             const { data: tag } = await supabase
//               .from('tags')
//               .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'slug' })
//               .select('id')
//               .single();

//             if (tag) {
//               await supabase
//                 .from('post_tags')
//                 .upsert([{ post_id: post.id, tag_id: tag.id }], { onConflict: 'post_id,tag_id' });
//             }
//           }
//         }

//         return res.status(201).json({ success: true, id: post.id });
//       }

//       // ----------------------------------------------------
//       // 3. 修改文章 (含更新關聯標籤)
//       // ----------------------------------------------------
//       case 'PUT': {
//         const { id, tags, ...postData } = req.body;

//         if (!id) return res.status(400).json({ error: '文章 ID 為必填' });

//         // 更新文章主體
//         const { error: postError } = await supabase
//           .from('posts')
//           .update(postData)
//           .eq('id', id);

//         if (postError) throw postError;

//         // 如果傳入標籤陣列，重新刷新該文章的中間表關聯
//         if (Array.isArray(tags)) {
//           // 先清空舊有的中間表資料
//           await supabase.from('post_tags').delete().eq('post_id', id);

//           // 重新為新標籤建立關聯
//           for (const tagName of tags) {
//             const tagSlug = generateSlug(tagName);

//             const { data: tag } = await supabase
//               .from('tags')
//               .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'slug' })
//               .select('id')
//               .single();

//             if (tag) {
//               await supabase
//                 .from('post_tags')
//                 .upsert([{ post_id: id, tag_id: tag.id }], { onConflict: 'post_id,tag_id' });
//             }
//           }
//         }

//         return res.status(200).json({ success: true });
//       }

//       // ----------------------------------------------------
//       // 4. 刪除文章 (先手動清除 post_tags，避免外鍵限制阻擋)
//       // ----------------------------------------------------
//       case 'DELETE': {
//         // 相容支援 query param (/api/db-posts?id=xxx) 或 body傳入 ({ id: 'xxx' })
//         const id = (req.query.id as string) || req.body?.id;

//         if (!id) return res.status(400).json({ error: '未提供要刪除的文章 ID' });

//         // Step 1: 先清除中間表 (post_tags) 中屬於這篇文章的關聯
//         const { error: tagRelationError } = await supabase
//           .from('post_tags')
//           .delete()
//           .eq('post_id', id);

//         if (tagRelationError) {
//           console.error('清除文章標籤關聯失敗:', tagRelationError.message);
//         }

//         // Step 2: 刪除文章主體
//         const { error: deletePostError } = await supabase
//           .from('posts')
//           .delete()
//           .eq('id', id);

//         if (deletePostError) throw deletePostError;

//         return res.status(200).json({ success: true, message: '文章已成功刪除' });
//       }

//       default:
//         res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//         return res.status(405).json({ error: `Method ${method} Not Allowed` });
//     }
//   } catch (err: any) {
//     console.error('文章 API 錯誤:', err.message);
//     return res.status(500).json({ error: err.message || '伺服器內部錯誤' });
//   }
// }
// src/pages/api/db-posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin as supabase } from '../../lib/adminsupbase'; // 使用 service_role key 的 supabase client

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/[\s_-]+/g, '-');
};

// 🚀 獨立出來的標籤關聯寫入函式 (穩定版)
async function linkTagsToPost(postId: string, tagNames: string[]) {
  if (!Array.isArray(tagNames) || tagNames.length === 0) return;

  for (const name of tagNames) {
    if (!name || typeof name !== 'string') continue;
    const trimmedName = name.trim();
    const tagSlug = generateSlug(trimmedName);

    // 1. 查尋標籤是否已存在
    let { data: existingTag, error: findErr } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', tagSlug)
      .maybeSingle();

    let tagId = existingTag?.id;

    // 2. 若不存在，則建立新標籤
    if (!tagId) {
      const { data: newTag, error: createErr } = await supabase
        .from('tags')
        .insert([{ name: trimmedName, slug: tagSlug }])
        .select('id')
        .single();

      if (createErr) {
        console.error(`建立標籤 [${trimmedName}] 失敗:`, createErr.message);
        continue;
      }
      tagId = newTag.id;
    }

    // 3. 檢查中間表 post_tags 是否已建立關聯
    const { data: existingLink } = await supabase
      .from('post_tags')
      .select('post_id')
      .eq('post_id', postId)
      .eq('tag_id', tagId)
      .maybeSingle();

    // 4. 若無關聯才寫入中間表
    if (!existingLink) {
      const { error: linkErr } = await supabase
        .from('post_tags')
        .insert([{ post_id: postId, tag_id: tagId }]);

      if (linkErr) {
        console.error(`寫入中間表 post_tags 失敗 (post: ${postId}, tag: ${tagId}):`, linkErr.message);
      }
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const { id } = req.query;

        let query = supabase
          .from('posts')
          .select(`*, post_tags ( tags ( name ) )`)
          .order('created_at', { ascending: false });

        if (id) {
          query = query.eq('id', id as string);
        }

        const { data, error } = await query;
        if (error) throw error;

        const formatted = (data || []).map((p) => ({
          ...p,
          tags: p.post_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || [],
        }));

        if (id) {
          return res.status(200).json(formatted[0] || null);
        }

        return res.status(200).json(formatted);
      }

      case 'POST': {
        const { tags, ...postData } = req.body;

        // 寫入文章
        const { data: post, error: postError } = await supabase
          .from('posts')
          .insert([postData])
          .select('id')
          .single();

        if (postError) {
          console.error('新增文章失敗:', postError.message);
          throw postError;
        }

        // 連結標籤到中間表
        if (tags && tags.length > 0) {
          await linkTagsToPost(post.id, tags);
        }

        return res.status(201).json({ success: true, id: post.id });
      }

      case 'PUT': {
        const { id, tags, ...postData } = req.body;

        if (!id) return res.status(400).json({ error: '文章 ID 為必填' });

        // 更新文章
        const { error: postError } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id);

        if (postError) {
          console.error('更新文章失敗:', postError.message);
          throw postError;
        }

        // 重新綁定標籤：先清空該文章舊有的中間表關聯
        if (Array.isArray(tags)) {
          const { error: clearErr } = await supabase
            .from('post_tags')
            .delete()
            .eq('post_id', id);

          if (clearErr) console.error('清空舊標籤失敗:', clearErr.message);

          // 重新寫入新標籤關聯
          await linkTagsToPost(id, tags);
        }

        return res.status(200).json({ success: true });
      }

      case 'DELETE': {
        const id = (req.query.id as string) || req.body?.id;
        if (!id) return res.status(400).json({ error: '未提供文章 ID' });

        // 刪除中間表關聯
        await supabase.from('post_tags').delete().eq('post_id', id);

        // 刪除文章
        const { error: deletePostError } = await supabase.from('posts').delete().eq('id', id);
        if (deletePostError) throw deletePostError;

        return res.status(200).json({ success: true });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (err: any) {
    console.error('文章 API 錯誤詳情:', err);
    return res.status(500).json({ error: err.message || '伺服器錯誤' });
  }
}