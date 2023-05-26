import {flow, makeAutoObservable} from "mobx";
import {authAPI} from "../api/todolists-api";
import auth from "./auth";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
class Init {
    status:RequestStatusType= 'idle'
    error:string | null= null
    isInitialized= false
    constructor() {
        makeAutoObservable(this)
    }
    setAppError(error: string | null){
        this.error=error
    }
    setAppStatus(status: RequestStatusType){
        this.status=status
    }
    initializeApp= flow( function* (this:Init){
        try {
            const res= yield authAPI.me()
            if (res.data.resultCode === 0) {
                this.isInitialized=true
                auth.setIsLoggedIn(true)
            }
            if (res.data.resultCode === 1) {
                this.isInitialized=true
                auth.setIsLoggedIn(false)
            }
        } catch (err){
            this.error='error'
        }
    })
}
export default new Init()