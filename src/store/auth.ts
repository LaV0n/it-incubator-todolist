import {flow, makeAutoObservable} from "mobx";
import init from "./init";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

class Auth{
    isLoggedIn= false
    constructor() {
        makeAutoObservable(this)
    }

    setIsLoggedIn(value: boolean ){
        this.isLoggedIn=value
    }
    logIn=flow(function*(this:Auth,param:LoginParamsType){
        init.setAppStatus('loading')

        try {
            const res = yield authAPI.login(param)
            if (res.data.resultCode === 0) {
                init.setAppStatus('succeeded')
                this.isLoggedIn=true
            }else {
                handleServerAppError(res.data)
            }
        }catch (err:any){
            handleServerNetworkError(err)
            init.setAppError('error')
        }
    })
    logOut=flow(function* (this:Auth){
        init.setAppStatus('loading')
        try {
            const res = yield authAPI.logout()
            if (res.data.resultCode === 0) {
                init.setAppStatus('succeeded')
                this.isLoggedIn=false
            }else {
                handleServerAppError(res.data)
            }
        }catch (err:any){
            handleServerNetworkError(err)
        }
    })
}
export default new Auth()