import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '14be27e1-1dd0-470f-9052-c789687a0751'
    }
})
type ItemType ={
    id:string
    title:string
    description:null | string
    todoListId:string
    order:number
    status:number
    priority:number
    startDate:null |string
    deadline:null | string
    addedDate:string
}
type TaskType= {
    error: null | string
    items: ItemType[]
    totalCount: number
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const taskAPI = {
    updateTask(todolistId: string, taskId:string, title: string) {
        const promise = instance.put<ResponseType<{item: ItemType}>>(`${todolistId}/tasks/${taskId}`, {title: title})
        return promise
    },
    getTask(todolistId: string) {
        const promise = instance.get<TaskType>(`${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string,title:string) {
        const promise = instance.post<ResponseType<{item: ItemType}>>(`${todolistId}/tasks`,{title: title})
        return promise
    },
    deleteTask(todolistId:string,taskId:string) {
        const promise = instance.delete<ResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
        return promise
    }
}
