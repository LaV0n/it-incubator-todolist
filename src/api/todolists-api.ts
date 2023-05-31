import axios from 'axios'
import {
   GetTasksResponse,
   TodolistType,
   UpdateTaskModelType,
   ResponseType,
} from '../common/types/types'
import { LoginParamsType, TaskType } from '../common/types/types'

const settings = {
   withCredentials: true,
   headers: {
      'API-KEY': '45599275-fc7c-4215-aaa5-a9a36d291e1f',
   },
}
const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings,
})

// api
export const todolistsAPI = {
   getTodolists() {
      return instance.get<TodolistType[]>('todo-lists')
   },
   createTodolist(title: string) {
      return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
   },
   deleteTodolist(id: string) {
      return instance.delete<ResponseType>(`todo-lists/${id}`)
   },
   updateTodolist(id: string, title: string) {
      return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
   },
   getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
   },
   deleteTask(todolistId: string, taskId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
   },
   createTask(todolistId: string, taskTitile: string) {
      return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {
         title: taskTitile,
      })
   },
   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
   },
}

export const authAPI = {
   login(data: LoginParamsType) {
      return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
   },
   logout() {
      return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
   },
   me() {
      return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me')
   },
}
