import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().min(1, {message: 'お名前は必須です。'}).max(30, {message: 'お名前は30文字以内で入力してください。'}),
  email: z.string().min(1, {message: 'メールアドレスは必須です。'}).email({message: 'メールアドレスを入力してください。'}),
  message: z.string().min(1, {message: '本文は必須です。'}).max(500, {message: '本文は500文字以内で入力してください。'}),
});

export type TFormSchema = z.infer<typeof FormSchema>;


export const AdminPostsSchema = z.object({
  title: z.string().min(1, {message: 'タイトルは必須です。'}),
  content: z.string().min(1, {message: '内容は必須です。'}),
  thumbnailUrl: z.string().url({message: 'URLを入力してください。'}),
  category: z.array(z.string()).min(1, {message: 'カテゴリーを1つ以上選択してください。'}),
})

export type TAdminPostsSchema = z.infer<typeof AdminPostsSchema>


export const AdminCategoriesSchema = z.object({
  category: z.string().min(1, {message: 'カテゴリ名は必須です。'})
})

export type TAdminCategoriesSchema = z.infer<typeof AdminCategoriesSchema>