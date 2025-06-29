'use client'

import { useForm } from "react-hook-form"
import Button from "@/app/_components/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { AdminCategoriesSchema, TAdminCategoriesSchema } from "@/app/_schema/formSchema"
import styles from "./page.module.scss"
import { useRouter } from "next/navigation"

export default function NewCategory() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAdminCategoriesSchema>({
    resolver: zodResolver(AdminCategoriesSchema)
  })

  const onSubmit = async (data: TAdminCategoriesSchema) => {
    try {

      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }


      alert('作成しました。\n一覧ページに戻ります。')
      console.log(data)
      
    }catch (error) {
      console.error(error)
      alert('送信に失敗しました。')
    }finally {
      router.push('/admin/categories')
    }
  }

  return(
    <div>
      <h1>カテゴリ作成</h1>
      <form className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem}>
          <label htmlFor="category">カテゴリ名</label>
          <input
            type="text"
            id="category"
            {...register('category')}
          />
          {errors.category && <div className={styles.error}>{errors.category.message}</div>}
        </div>
        <div className={styles.formItem}>
          <Button 
            name='create'
            text='作成'
          />
        </div>
      </form>
    </div>
  )
}