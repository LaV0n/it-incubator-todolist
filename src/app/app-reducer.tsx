export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType= null | string

const initialState = {
    status: 'loading'  as RequestStatusType,
    error: null as ErrorType
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppStatusAC =(status:RequestStatusType)=>{
    return {type:'APP/SET-STATUS', status} as const
}

export const setAppErrorAC =(error:ErrorType)=>{
    return {type:'APP/SET-ERROR', error} as const
}

export type ActionsAppType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
export type SetAppErrorActionType=ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType=ReturnType<typeof setAppStatusAC>