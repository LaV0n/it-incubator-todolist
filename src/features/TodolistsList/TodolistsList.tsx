import React, { useCallback, useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import auth from '../../store/auth'
import todolists from '../../store/todolists'

type PropsType = {
   demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = observer(({ demo }) => {
   const todolistsItems = todolists.todos
   const isLoggedIn = auth.isLoggedIn

   useEffect(() => {
      if (demo || !isLoggedIn) return
      todolists.fetchTodolists()
   }, [demo, isLoggedIn])

   const addTodolist = useCallback((title: string) => {
      todolists.addTodolist(title)
   }, [])

   if (!isLoggedIn) {
      return <Redirect to={'/login'} />
   }
   return (
      <>
         <Grid container style={{ padding: '20px' }}>
            <AddItemForm addItem={addTodolist} />
         </Grid>
         <Grid container spacing={3}>
            {todolistsItems.map(tl => {
               return (
                  <Grid item key={tl.id}>
                     <Paper style={{ padding: '10px' }}>
                        <Todolist todolist={tl} demo={demo} />
                     </Paper>
                  </Grid>
               )
            })}
         </Grid>
      </>
   )
})
