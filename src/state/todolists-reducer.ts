import {FilterValuesType, TodolistType} from "../App";
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
export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (title: string,id:string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id:id}
}
export const ChangeTodolistFilterAC = (id:string,filter:FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id:id, filter:filter}
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.id);
        case 'ADD-TODOLIST':
            let newList:TodolistType ={id:v1(), title:action.title, filter:"all"};
            return [...state,newList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=>tl.id===action.id?{...tl,title:action.title}:tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id===action.id?{...tl,filter:action.filter}:tl);
        default:
            throw new Error("I don't understand this type")
    }
}