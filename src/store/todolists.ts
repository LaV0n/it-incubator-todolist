import { flow, makeAutoObservable } from 'mobx'
import { todolistsAPI } from '../api/todolists-api'
import init from './init'
import { handleServerNetworkError } from '../common/utils/error-utils'
import tasks from './tasks'
import {
   FilterValuesType,
   RequestStatusType,
   TodolistDomainType,
   TodolistType,
} from '../common/types/types'

class Todolists {
   todos: TodolistDomainType[] = []
   constructor() {
      makeAutoObservable(this)
   }
   changeTodolistFilter(id: string, filter: FilterValuesType) {
      const index = this.todos.findIndex(tl => tl.id === id)
      this.todos[index].filter = filter
   }
   changeTodolistEntityStatus(id: string, status: RequestStatusType) {
      const index = this.todos.findIndex(tl => tl.id === id)
      this.todos[index].entityStatus = status
   }
   fetchTodolists = flow(function* (this: Todolists) {
      init.setAppStatus('loading')
      try {
         const res = yield todolistsAPI.getTodolists()
         init.setAppStatus('succeeded')
         this.todos = res.data.map((tl: TodolistType) => ({
            ...tl,
            filter: 'all',
            entityStatus: 'idle',
         }))
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   removeTodolist = flow(function* (this: Todolists, todolistId: string) {
      init.setAppStatus('loading')
      this.changeTodolistEntityStatus(todolistId, 'loading')
      try {
         yield todolistsAPI.deleteTodolist(todolistId)
         init.setAppStatus('succeeded')
         const index = this.todos.findIndex(tl => tl.id === todolistId)
         if (index > -1) {
            tasks.deleteTodolist(todolistId)
            this.todos.splice(index, 1)
         }
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   addTodolist = flow(function* (this: Todolists, title: string) {
      init.setAppStatus('loading')
      try {
         const res = yield todolistsAPI.createTodolist(title)
         init.setAppStatus('succeeded')
         this.todos.unshift({ ...res.data.data.item, filter: 'all', entityStatus: 'idle' })
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   changeTodolistTitle = flow(function* (this: Todolists, id: string, title: string) {
      this.changeTodolistEntityStatus(id, 'loading')
      try {
         yield todolistsAPI.updateTodolist(id, title)
         this.changeTodolistEntityStatus(id, 'succeeded')
         const index = this.todos.findIndex(tl => tl.id === id)
         this.todos[index].title = title
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
}
export default new Todolists()
