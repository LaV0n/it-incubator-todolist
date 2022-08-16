import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '14be27e1-1dd0-470f-9052-c789687a0751'
    }
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTodolist() {
        const promise = instance.get<TodolistType[]>('todo-lists')
        return promise
    },
    createTodolist(title:string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title: title})
        return promise
    },
    deleteTodolist(todolistId:string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    }
}
