import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import { AddItemFormPropsType } from '../../types/types'

export const AddItemForm = React.memo(function ({
   addItem,
   placeholder,
   disabled = false,
}: AddItemFormPropsType) {
   const [title, setTitle] = useState('')
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== '') {
         addItem(title)
         setTitle('')
      } else {
         setError('Title is required')
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.charCode === 13) {
         addItemHandler()
      }
   }

   return (
      <div>
         <TextField
            variant="outlined"
            disabled={disabled}
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label={placeholder}
            helperText={error}
         />
         <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
            <AddBox />
         </IconButton>
      </div>
   )
})
