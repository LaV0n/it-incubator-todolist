import React, { useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
        console.log("todolist call")
        const addTask = useCallback((title: string) => {
            props.addTask(title, props.id);
        }, [props.addTask, props.id]);

        const removeTodolist = () => {
            props.removeTodolist(props.id);
        }
        const changeTodolistTitle = (title: string) => {
            props.changeTodolistTitle(props.id, title);
        }

        const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
        const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
        const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

        let tasks = [...props.tasks]

        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }

        return <div >
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks.map(t => {
                        console.log('task')
                        const removeTask = (taskId: string) => props.removeTask(taskId, props.id)
                        const onChangeStatusHandler = (taskId: string, newStatus: boolean) => {

                            props.changeTaskStatus(taskId, newStatus, props.id);
                        }
                        const onTitleChangeHandler = (taskId: string, newValue: string) => {
                            props.changeTaskTitle(taskId, newValue, props.id);
                        }


                        return <Task key={t.id}
                                     task={t}
                                     removeTask={removeTask}
                                     changeTaskStatus={onChangeStatusHandler}
                                     changeTaskTitle={onTitleChangeHandler}/>
                    })}
            </div>
            <div style={{paddingTop: "10px"}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'default'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    }
)

