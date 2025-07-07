import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { TAdminCategoriesSchema } from '@/app/_schema/formSchema';
import styles from './CategoryForm.module.scss';

type CategoryFormProps = {
  register: UseFormRegister<TAdminCategoriesSchema>
  handleSubmit: UseFormHandleSubmit<TAdminCategoriesSchema>
  onSubmit: (data: TAdminCategoriesSchema) => Promise<void>
  errors: FieldErrors<TAdminCategoriesSchema>
  isSubmitting: boolean
}

export default function CategoryForm({register, handleSubmit, onSubmit, errors, isSubmitting}:CategoryFormProps) {
  return (
    <form id='form' className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formItem}>
        <label htmlFor="category">カテゴリ名</label>
        <input
          type="text"
          id='category'
          {...register('category')}
          disabled={isSubmitting}
          />
        {errors.category && <div className={styles.error}>{errors.category.message as string}</div>}
      </div>
    </form>
    )
}