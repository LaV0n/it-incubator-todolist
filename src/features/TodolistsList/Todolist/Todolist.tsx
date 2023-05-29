import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses} from '../../../api/todolists-api'
import {useDispatch} from 'react-redux'
import todolists, {FilterValuesType, TodolistDomainType} from "../../../store/todolists";
import {observer} from "mobx-react-lite";
import tasks from "../../../store/tasks";

type PropsType = {
    todolist: TodolistDomainType
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist = observer(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')

    const dispatch = useDispatch()

    const tasksData= tasks.tasksData[props.todolist.id]

    useEffect(() => {
        if (demo) {
            return
        }
       tasks.fetchTasks(props.todolist.id)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        todolists.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        todolists.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id])

    const changeFilterClickHandler = (filter:FilterValuesType) => todolists.changeTodolistFilter(props.todolist.id,filter)


    let tasksForTodolist = tasksData

    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksData.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksData.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            { tasksForTodolist &&
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={()=>changeFilterClickHandler("all")}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={()=>changeFilterClickHandler('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={()=>changeFilterClickHandler('completed')}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

