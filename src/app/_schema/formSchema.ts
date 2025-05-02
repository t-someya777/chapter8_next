import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().min(1, {message: 'お名前は必須です。'}).max(30, {message: 'お名前は30文字以内で入力してください。'}),
  email: z.string().min(1, {message: 'メールアドレスは必須です。'}).email({message: 'メールアドレスを入力してください。'}),
  message: z.string().min(1, {message: '本文は必須です。'}).max(500, {message: '本文は500文字以内で入力してください。'}),
});

export type TFormSchema = z.infer<typeof FormSchema>;