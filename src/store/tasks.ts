import { flow, makeAutoObservable } from 'mobx'
import {
   TaskPriorities,
   TaskStatuses,
   TaskType,
   todolistsAPI,
   UpdateTaskModelType,
} from '../api/todolists-api'
import init from './init'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

export type TasksStateType = {
   [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
}
class Tasks {
   tasksData: TasksStateType = {}

   constructor() {
      makeAutoObservable(this)
   }

   fetchTasks = flow(function* (this: Tasks, todolistId: string) {
      init.setAppStatus('loading')
      try {
         init.setAppStatus('succeeded')
         const res = yield todolistsAPI.getTasks(todolistId)

         this.tasksData[todolistId] = res.data.items
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   removeTask = flow(function* (this: Tasks, taskId: string, todolistId: string) {
      init.setAppStatus('loading')
      try {
         yield todolistsAPI.deleteTask(todolistId, taskId)
         const tasks = this.tasksData[todolistId]
         const index = tasks.findIndex(t => t.id === taskId)
         if (index > -1) {
            tasks.splice(index, 1)
         }
         init.setAppStatus('succeeded')
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   addTask = flow(function* (this: Tasks, title: string, todolistId: string) {
      init.setAppStatus('loading')
      try {
         const res = yield todolistsAPI.createTask(todolistId, title)
         if (res.data.resultCode === 0) {
            init.setAppStatus('succeeded')
            this.tasksData[todolistId].unshift(res.data.data.item)
         } else {
            handleServerAppError(res.data)
         }
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   updateTask = flow(function* (
      this: Tasks,
      taskId: string,
      todolistId: string,
      domainModel: UpdateDomainTaskModelType
   ) {
      init.setAppStatus('loading')
      const task = this.tasksData[todolistId].find(t => t.id === taskId)
      if (!task) {
         return console.error('task not found in the state')
      }
      const apiModel: UpdateTaskModelType = {
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate,
         title: task.title,
         status: task.status,
         ...domainModel,
      }

      try {
         const res = yield todolistsAPI.updateTask(todolistId, taskId, apiModel)
         if (res.data.resultCode === 0) {
            init.setAppStatus('succeeded')
            const tasks = this.tasksData[todolistId]
            const index = tasks.findIndex(t => t.id === taskId)
            if (index > -1) {
               tasks[index] = { ...tasks[index], ...domainModel }
            }
         } else {
            handleServerAppError(res.data)
         }
      } catch (err: any) {
         handleServerNetworkError(err)
      }
   })
   deleteTodolist(todolistId: string) {
      delete this.tasksData[todolistId]
   }
}
export default new Tasks()
