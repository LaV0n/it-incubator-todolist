import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import { Redirect } from 'react-router-dom'
import {observer} from "mobx-react-lite";
import auth from "../../store/auth";
import todolists from "../../store/todolists";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = observer(({demo }) => {

    const todolistsItems = todolists.todos
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn =  auth.isLoggedIn

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) return
        todolists.fetchTodolists()
    }, [demo,isLoggedIn])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTaskTC({taskId, todolistId})
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC({title, todolistId})
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC({taskId:id, domainModel:{status}, todolistId:todolistId})
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC({taskId:id, domainModel:{title: newTitle}, todolistId:todolistId})
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
       todolists.addTodolist(title)
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolistsItems.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
})
