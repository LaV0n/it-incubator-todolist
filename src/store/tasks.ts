import {flow, makeAutoObservable} from "mobx";
import {TaskType, todolistsAPI} from "../api/todolists-api";
import init from "./init";
import {handleServerNetworkError} from "../utils/error-utils";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
class Tasks {
    tasksData: TasksStateType = {}

    constructor() {
        makeAutoObservable(this)
    }

    fetchTasks = flow(function* (this:Tasks,todolistId:string) {
            init.setAppStatus('loading')
        try{
                init.setAppStatus('succeeded')
            const res= yield todolistsAPI.getTasks(todolistId)

            this.tasksData[todolistId]=res.data.items
        }catch (err:any){
            handleServerNetworkError(err)
        }
        }
    )
}
export default new Tasks()