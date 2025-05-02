'use client'

import styles from './page.module.scss'
import { useForm } from "react-hook-form"
import { FormSchema , TFormSchema } from '@/schema/FormSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema)
  })

  const handleReset = () => {
    reset()
  }

  const handleSubmitForm = async (data: TFormSchema) => {
    try {
      const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if(!response.ok) {
        throw new Error('データを送信できませんでした。')
      }

      alert('送信しました。')
      reset()
    }catch (error) {
      console.error(error)
      alert('送信に失敗しました。')
    }

  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>問合わせフォーム</h1>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.formItem}>
          <label htmlFor='name' className={styles.label}>お名前</label>
          <div>
              <input
                id='name'
                type="text"
                {...register('name')}
                disabled={isSubmitting}
              />
              {errors.name && <div className={styles.error}>{errors.name.message}</div>}
            </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='email' className={styles.label}>メールアドレス</label>
          <div>
            <input
              id='email'
              type="email"
              {...register('email')}
              disabled={isSubmitting}
            />
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
          </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor='message' className={styles.label}>本文</label>
          <div>
            <textarea
              id='message'
              {...register('message')}
              disabled={isSubmitting}
            />
            {errors.message && <div className={styles.error}>{errors.message.message}</div>}
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button type='submit' className={styles.button} disabled={isSubmitting}>送信</button>
          <button type='button' className={styles.button} onClick={handleReset} disabled={isSubmitting}>クリア</button>
        </div>
      </form>
    </div>
  )
}