import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '0365777f-fba1-4808-ae03-5302744c95de';
    useEffect(() => {
       taskAPI.getTask(todolistId)
            .then((res) =>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '0365777f-fba1-4808-ae03-5302744c95de';
    useEffect(() => {
       taskAPI.createTask(todolistId,'new task')
            .then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '0365777f-fba1-4808-ae03-5302744c95de';
    const taskId='c793c9cb-3b90-4c92-8216-3a3593d156f4'
    useEffect(() => {
        taskAPI.deleteTask(todolistId,taskId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '0365777f-fba1-4808-ae03-5302744c95de'
    const taskId='9302b4b8-cbd4-4053-ac40-da8a54f674c1'
    useEffect(() => {
        taskAPI.updateTask(todolistId,taskId,"updated task")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
