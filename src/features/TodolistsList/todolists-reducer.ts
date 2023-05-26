import {todolistsAPI} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterValuesType, TodolistDomainType} from "../../store/todolists";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers:builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=>{
           return  action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action)=>{
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action)=>{
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC,changeTodolistEntityStatusAC}= slice.actions

// thunks

export const fetchTodolistsTC =createAsyncThunk('todolists/fetchTodolists',async (arg, thunkAPI)=> {

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
       // handleServerNetworkError(error);
        return thunkAPI.rejectWithValue({})
    }
})

export const removeTodolistTC =createAsyncThunk('todolists/removeTodolist',async (todolistId: string, thunkAPI)=> {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    await todolistsAPI.deleteTodolist(todolistId)
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    } catch (error: any) {
       // handleServerNetworkError(error);
        return thunkAPI.rejectWithValue({})
    }
})

export const addTodolistTC =createAsyncThunk('todolists/addTodolist',async (title: string, thunkAPI)=> {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } catch (error: any) {
        //handleServerNetworkError(error);
        return thunkAPI.rejectWithValue({})
    }
})

export const changeTodolistTitleTC =createAsyncThunk('todolists/changeTodolist',async (params:{id: string, title: string}, thunkAPI)=> {
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id:params.id, status: 'loading'}))
    await todolistsAPI.updateTodolist(params.id, params.title)
    try {
        thunkAPI.dispatch(changeTodolistEntityStatusAC({id:params.id, status: 'succeeded'}))
        return params
    } catch (error: any) {
        //handleServerNetworkError(error);
        return thunkAPI.rejectWithValue({})
    }
})
