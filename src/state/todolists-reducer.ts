import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from 'uuid';

type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export type RemoveTodoListActionType ={
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodoListActionType ={
    type:'ADD-TODOLIST'
    title:string
    todoListId:string
}
export type ChangeTodoListTitleActionType ={
    type:'CHANGE-TODOLIST-TITLE'
    title:string
    id:string
}
export type ChangeTodoListFilterActionType ={
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:FilterValuesType
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todoListId:v1()}
}
export const ChangeTodolistTitleAC = (id:string,title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE',  id:id,title: title,}
}
export const ChangeTodolistFilterAC = (id:string,filter:FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id:id, filter:filter}
}
const initialState:TodolistType[]=[]

export const todolistsReducer = (state=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.id);
        case 'ADD-TODOLIST':
            let newList:TodolistType ={id:action.todoListId, title:action.title, filter:"all"};
            return [...state,newList];
        case 'CHANGE-TODOLIST-TITLE':
            debugger
            return state.map(tl=>tl.id===action.id?{...tl,title:action.title}:tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id===action.id?{...tl,filter:action.filter}:tl);
        default:
           return state
    }
}