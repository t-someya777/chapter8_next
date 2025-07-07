
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form'
import { TAdminPostsSchema } from '@/app/_schema/formSchema'
import styles from './PostForm.module.scss'
import { Category } from '@prisma/client'

type PostFormProps = {
  register: UseFormRegister<TAdminPostsSchema>
  handleSubmit: UseFormHandleSubmit<TAdminPostsSchema>
  onSubmit:(data: TAdminPostsSchema) => Promise<void>
  errors: FieldErrors<TAdminPostsSchema>
  category: Category[] | null
  isSubmitting: boolean
}

export default function PostForm({ register, handleSubmit, onSubmit, errors, category, isSubmitting}:PostFormProps){

  if(!category) {
    return <div>カテゴリーがありません</div>
  }
  
  return (
    <form className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.formItem}>
      <label htmlFor="title">タイトル</label>
      <input 
        type="text" 
        id="title" 
        {...register('title')}
        disabled={isSubmitting}
        />
      {errors.title && <div className={styles.error}>{errors.title.message}</div>}
    </div>
    <div className={styles.formItem}>
      <label htmlFor="content">内容</label>
      <input 
        type="text" 
        id="content" 
        {...register('content')}
        disabled={isSubmitting}
        />
        {errors.content && <div className={styles.error}>{errors.content.message}</div>}
    </div>
    <div className={styles.formItem}>
      <label htmlFor="thumbnailUrl">サムネイルURL</label>
      <input 
        type="url" 
        id="thumbnailUrl" 
        {...register('thumbnailUrl')}
        disabled={isSubmitting}
        />
        {errors.thumbnailUrl && <div className={styles.error}>{errors.thumbnailUrl.message}</div>}
    </div>
    <div className={styles.formItem}>
      <p>カテゴリ</p>
      <div className={styles.checkboxContainer}>
        {category.map(cate => (
          <label key={cate.id}>
            <input
              type="checkbox"
              value={cate.id}
              {...register('category')}
              disabled={isSubmitting}
            />
            {cate.name}
          </label>
        ))}
      </div>
      {errors.category && <div className={styles.error}>{errors.category.message}</div>}
    </div>
</form>

  )
}