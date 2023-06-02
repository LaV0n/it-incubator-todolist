export type ComponentType = {
   demo?: boolean
}
export type LoginParamsType = {
   email: string
   password: string
   rememberMe: boolean
   captcha?: string
}
export type TodolistType = {
   id: string
   title: string
   addedDate: string
   order: number
}
export type ResponseType<D = {}> = {
   resultCode: number
   messages: Array<string>
   data: D
}
export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
}
export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}
export type TaskType = {
   description: string
   title: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}
export type UpdateTaskModelType = {
   title: string
   description: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
}
export type GetTasksResponse = {
   error: string | null
   totalCount: number
   items: TaskType[]
}
export type FormValuesType = {
   email: string
   password: string
   rememberMe: boolean
}
export type TodolistComponentType = {
   todolist: TodolistDomainType
   demo?: boolean
}
export type TaskPropsType = {
   task: TaskType
   todolistId: string
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
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
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}
export type AddItemFormPropsType = {
   addItem: (title: string) => void
   disabled?: boolean
   placeholder: string
}
export type EditableSpanPropsType = {
   value: string
   onChange: (newValue: string) => void
}
