import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { Delete } from '@material-ui/icons'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import tasks from '../../../../store/tasks'

type TaskPropsType = {
   task: TaskType
   todolistId: string
}

export const Task = React.memo(({ task, todolistId }: TaskPropsType) => {
   const removeTaskHandler = useCallback(
      () => tasks.removeTask(task.id, todolistId),
      [task.id, todolistId]
   )
   const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const newIsDoneValue = e.currentTarget.checked
         tasks.updateTask(task.id, todolistId, {
            status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
         })
      },
      [task.id, todolistId]
   )

   const onTitleChangeHandler = useCallback(
      (newValue: string) => {
         tasks.updateTask(task.id, todolistId, { title: newValue })
      },
      [task.id, todolistId]
   )

   return (
      <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
         <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
         />
         <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
         <IconButton onClick={removeTaskHandler}>
            <Delete />
         </IconButton>
      </div>
   )
})
