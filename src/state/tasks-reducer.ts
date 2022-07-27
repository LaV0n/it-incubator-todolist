import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type ActionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodoListActionType |
    RemoveTodoListActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-STATUS-TASK'
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleACType ={
    type: 'CHANGE-TITLE-TASK'
    id: string
    newTitle: string
    todolistId: string
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-STATUS-TASK', id: id, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TITLE-TASK', id: id, newTitle: newTitle, todolistId: todolistId}
}

const initialState:TasksStateType={}

export const tasksReducer = (state=initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]};
        case 'CHANGE-STATUS-TASK':
            return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.id?{...t,isDone:action.isDone}:t)}
        case 'CHANGE-TITLE-TASK':
            return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.id?{...t,title:action.newTitle}:t)}
        case 'ADD-TODOLIST':
            return {...state,[action.todoListId]:[]}
        case 'REMOVE-TODOLIST':
            let copy ={...state};
            delete copy[action.id]
            return copy
        default:
            return state;
    }
}