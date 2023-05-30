import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Task } from './Task/Task'
import { TaskStatuses } from '../../../api/todolists-api'
import todolists, { FilterValuesType, TodolistDomainType } from '../../../store/todolists'
import { observer } from 'mobx-react-lite'
import tasks from '../../../store/tasks'

type PropsType = {
   todolist: TodolistDomainType
   demo?: boolean
}

export const Todolist = observer(function ({ demo = false, todolist }: PropsType) {
   console.log('Todolist called')

   const tasksData = tasks.tasksData[todolist.id]

   useEffect(() => {
      if (demo) {
         return
      }
      tasks.fetchTasks(todolist.id)
   }, [])

   const addTask = useCallback(
      (title: string) => {
         tasks.addTask(title, todolist.id)
      },
      [todolist.id]
   )

   const removeTodolist = () => {
      todolists.removeTodolist(todolist.id)
   }
   const changeTodolistTitle = useCallback(
      (title: string) => {
         todolists.changeTodolistTitle(todolist.id, title)
      },
      [todolist.id]
   )

   const changeFilterClickHandler = (filter: FilterValuesType) =>
      todolists.changeTodolistFilter(todolist.id, filter)

   let tasksForTodolist = tasksData

   if (todolist.filter === 'active') {
      tasksForTodolist = tasksData.filter(t => t.status === TaskStatuses.New)
   }
   if (todolist.filter === 'completed') {
      tasksForTodolist = tasksData.filter(t => t.status === TaskStatuses.Completed)
   }

   return (
      <div>
         <h3>
            <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
               <Delete />
            </IconButton>
         </h3>
         <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'} />
         <div>
            {tasksForTodolist &&
               tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id} />)}
         </div>
         <div style={{ paddingTop: '10px' }}>
            <Button
               variant={todolist.filter === 'all' ? 'outlined' : 'text'}
               onClick={() => changeFilterClickHandler('all')}
               color={'default'}
            >
               All
            </Button>
            <Button
               variant={todolist.filter === 'active' ? 'outlined' : 'text'}
               onClick={() => changeFilterClickHandler('active')}
               color={'primary'}
            >
               Active
            </Button>
            <Button
               variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
               onClick={() => changeFilterClickHandler('completed')}
               color={'secondary'}
            >
               Completed
            </Button>
         </div>
      </div>
   )
})
