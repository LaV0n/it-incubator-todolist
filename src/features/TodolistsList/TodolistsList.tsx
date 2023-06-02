import React, { useCallback, useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { AddItemForm } from '../../common/components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import auth from '../../store/auth'
import todolists from '../../store/todolists'
import { ComponentType } from '../../common/types/types'
import '../../app/App.css'

export const TodolistsList: React.FC<ComponentType> = observer(({ demo }) => {
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
         <Grid
            container
            style={{ margin: 20, width: 315, padding: 20 }}
            className="formControl"
            justifyContent={'center'}
         >
            <AddItemForm addItem={addTodolist} placeholder={'new List'} />
         </Grid>
         <Grid container spacing={3} justifyContent={'center'}>
            {todolistsItems.map(tl => (
               <Grid item key={tl.id}>
                  <Paper
                     style={{
                        padding: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 15,
                     }}
                  >
                     <Todolist todolist={tl} demo={demo} />
                  </Paper>
               </Grid>
            ))}
         </Grid>
      </>
   )
})
