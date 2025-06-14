import {
  Dialog,DialogTitle,DialogContent,
  FormGroup,FormControlLabel,Checkbox
} from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { Category } from '@prisma/client';
import { TAdminPostsSchema } from '@/app/_schema/formSchema';

type DialogProps = {
  handleClose:() => void
  state: boolean
  items: Category[] | undefined
  control:Control<TAdminPostsSchema>
}

export default function CategoryDialog({handleClose, state, items, control}:DialogProps) {

  const handleValue = (e:React.ChangeEvent<HTMLInputElement>,values:number[] ) => {
    const checked = e.target.checked
    const value = Number(e.target.value)
    const newValue = checked ? [...values, value] : [...values].filter(v => v !== value)
    return newValue
  }

  if (!items) {
    return (
      <Dialog onClose={handleClose} open={state}>
        <DialogTitle>カテゴリー選択</DialogTitle>
        <DialogContent>
        <FormGroup>
          <div>カテゴリーが存在しません</div>
          <button type="button" onClick={handleClose}>閉じる</button>
        </FormGroup>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Controller
      name='category'
      control={control}
      render={({field: {onChange, value} }) => (
          <Dialog onClose={handleClose} open={state}>
          <DialogTitle>カテゴリー選択</DialogTitle>
          <DialogContent>
          <FormGroup>
            {items.map(item => (
                <FormControlLabel
                  key={item.id}
                  control={<Checkbox
                    onChange={e => {
                      const update = handleValue(e,value || [])
                      onChange(update)
                    }}
                    value={item.id}
                  />} 
                  label={item.name} 
                />   
              ))
            }
            <button type="button" onClick={handleClose}>閉じる</button>
          </FormGroup>
          </DialogContent>
        </Dialog>
      )}
    />
  )
}