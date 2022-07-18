import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import "./App.css";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    titleList: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    ChangeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    ChangeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    editTask: (todoListId: string, id: string, title: string) => void
    editToDoList: (todoListId: string, title: string) => void
}

function Todolist(props: PropsType) {

    const filterClickHandler = (filter: FilterValueType) => {
        props.ChangeFilter(filter, props.id);
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id);
    }

    const editTaskHAndler = (taskID: string, newTitle: string) => {
        props.editTask(props.id, taskID, newTitle);
    }
    const editToDoListHandler = (newTitle: string) => {
        props.editToDoList(props.id, newTitle);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.titleList} callback={editToDoListHandler}/>
                <IconButton onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <Input callback={addTaskHandler}/>
            <ul>
                {props.tasks.length ?
                    props.tasks.map((x) => {
                            const onClickHandler = () => {
                                props.removeTask(x.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.ChangeStatus(x.id, newIsDoneValue, props.id);
                            }
                            return (
                                <div>
                                    <li style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: "10px"
                                    }}
                                        className={x.isDone ? "is-done" : ""}
                                    ><Checkbox
                                        color="primary"
                                        checked={x.isDone}
                                        onChange={onChangeHandler}/>
                                        <EditableSpan title={x.title}
                                                      callback={(newTitle) => editTaskHAndler(x.id, newTitle)}/>
                                        <IconButton onClick={onClickHandler}><Delete/></IconButton>
                                    </li>
                                </div>

                            )
                        }
                    ) :
                    <span>Empty List</span>}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={() => filterClickHandler("all")}
                        color={"inherit"}
                >All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={() => filterClickHandler("active")}
                        color={"primary"}
                >Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={() => filterClickHandler("completed")}
                        color={"secondary"}
                >Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;