
import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { TAdminPostsSchema } from '@/app/_schema/formSchema'
import styles from './PostForm.module.scss'
import { Category } from '@prisma/client'
import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'

type PostFormProps = {
  register: UseFormRegister<TAdminPostsSchema>
  handleSubmit: UseFormHandleSubmit<TAdminPostsSchema>
  setValue: UseFormSetValue<TAdminPostsSchema>
  onSubmit:(data: TAdminPostsSchema) => Promise<void>
  errors: FieldErrors<TAdminPostsSchema>
  category: Category[] | null
  isSubmitting: boolean
  thumbnailKey?: string
}

export default function PostForm({ register, handleSubmit, setValue, onSubmit, errors, category, isSubmitting, thumbnailKey}:PostFormProps){

  const [thumbnailImageKey, setThumbnailImageKey] = useState(thumbnailKey)
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState('')

  
  const handleImageChange = async(event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files
    if(!files || files.length === 0) {
      console.log('ファイルが選択されていません')
      return
    }
    
    const file = files[0]
    const filePath = `private/${uuidv4()}`
    
    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('post_thumbnail') // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message)
      return
    }

    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path)
    // react-hook-formのフォーム値として画像のキーを設定
    setValue('thumbnailImageKey', data.path , {
      shouldValidate: true
    })
  }

  useEffect(() => {
    if(!thumbnailImageKey) return

    const fetcher = async () => {
      const {
        data: {publicUrl},
      } = await supabase.storage  
        .from('post_thumbnail')
        .getPublicUrl(thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  }, [thumbnailImageKey])

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
      <label htmlFor="thumbnailImage">サムネイル画像</label>
      <input 
        type="file" 
        id="thumbnailImage"
        onChange={handleImageChange}
        disabled={isSubmitting}
        accept="image/*"
        />
      {/* 実際にフォームで送信 */}
      <input 
        type="hidden"
        id='thumbnailImageKey'
        {...register('thumbnailImageKey')}
      />
      {thumbnailImageUrl && (
        <div className="mt-2">
          <Image
            src={thumbnailImageUrl}
            alt="thumbnail"
            width={400}
            height={400}
            />
          </div>
        )}
        {errors.thumbnailImageKey && <div className={styles.error}>{errors.thumbnailImageKey.message}</div>}
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