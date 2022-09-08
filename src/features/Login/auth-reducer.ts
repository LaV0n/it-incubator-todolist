import {authAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";


type ActionType = ReturnType<typeof setIsLoggedInAC> |
    SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setInitializedAC>

type initialStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
}

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setInitializedAC = (value: boolean) =>
    ({type: 'login/SET-INITIALIZED', value} as const)

export const loginTC = (data: any) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
    }
}
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    const res = await authAPI.me()
    dispatch(setInitializedAC(true))
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
    } else {
        handleServerAppError(res.data, dispatch);
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
    }
}


