import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice=createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        setAppErrorAC(state,action:PayloadAction<{error: string | null}>){
            state.error=action.payload.error
        },
        setAppStatusAC(state,action:PayloadAction<{status: RequestStatusType}>){
            state.status=action.payload.status
        }
    },
    extraReducers:builder => {
        builder.addCase(initializeAppTC.fulfilled,(state)=>{
            state.isInitialized=true
        })
    }
})

export const appReducer =slice.reducer
export const {setAppErrorAC,setAppStatusAC}=slice.actions

export const initializeAppTC =createAsyncThunk('app/initialize',async (arg, {dispatch})=>{
    const res= await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value:true}));
    } else {  }
    return
})
