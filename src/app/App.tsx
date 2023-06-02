import React, { useCallback, useEffect } from 'react'
import './App.css'
import {
   AppBar,
   Button,
   CircularProgress,
   Container,
   LinearProgress,
   Toolbar,
   Typography,
} from '@material-ui/core'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Route } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import init from '../store/init'
import auth from '../store/auth'
import { observer } from 'mobx-react-lite'
import { ComponentType } from '../common/types/types'

const App = observer(({ demo = false }: ComponentType) => {
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
         <div
            style={{
               position: 'fixed',
               top: '30%',
               textAlign: 'center',
               width: '100%',
            }}
         >
            <CircularProgress />
         </div>
      )
   }

   return (
      <div className="App">
         <ErrorSnackbar />
         <AppBar position="static" style={{ background: 'rgba(13, 114, 8, 0.8)' }}>
            <Toolbar>
               <Typography variant="h6">Todolists</Typography>
               {isLoggedIn && (
                  <Button
                     color="inherit"
                     onClick={logoutHandler}
                     style={{ right: 20, position: 'absolute' }}
                  >
                     Log out
                  </Button>
               )}
            </Toolbar>
            <div className="progress">{status === 'loading' && <LinearProgress />}</div>
         </AppBar>
         <Container>
            <Route exact path={'/'} render={() => <TodolistsList demo={demo} />} />
            <Route path={'/login'} render={() => <Login />} />
         </Container>
      </div>
   )
})
export default App
