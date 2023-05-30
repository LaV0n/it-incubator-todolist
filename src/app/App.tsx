import React, { useCallback, useEffect } from 'react'
import './App.css'
import {
   AppBar,
   Button,
   CircularProgress,
   Container,
   IconButton,
   LinearProgress,
   Toolbar,
   Typography,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Route } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import init from '../store/init'
import auth from '../store/auth'
import { observer } from 'mobx-react-lite'

type PropsType = {
   demo?: boolean
}

const App = observer(({ demo = false }: PropsType) => {
   const status = init.status
   const isInitialized = init.isInitialized
   const isLoggedIn = auth.isLoggedIn

   useEffect(() => {
      init.initializeApp()
   }, [])

   const logoutHandler = useCallback(() => {
      auth.logOut()
   }, [])

   if (!isInitialized) {
      return (
         <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
         </div>
      )
   }

   return (
      <div className="App">
         <ErrorSnackbar />
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu />
               </IconButton>
               <Typography variant="h6">News</Typography>
               {isLoggedIn && (
                  <Button color="inherit" onClick={logoutHandler}>
                     Log out
                  </Button>
               )}
            </Toolbar>
            {status === 'loading' && <LinearProgress />}
         </AppBar>
         <Container fixed>
            <Route exact path={'/'} render={() => <TodolistsList demo={demo} />} />
            <Route path={'/login'} render={() => <Login />} />
         </Container>
      </div>
   )
})
export default App
