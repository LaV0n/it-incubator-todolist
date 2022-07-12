import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import "./App.css";
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";

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
    editTask:(todoListId:string,id: string,title: string)=>void
    editToDoList:(todoListId:string,title: string)=>void
}

function Todolist(props: PropsType) {

    const filterClickHandler = (filter: FilterValueType) => {
        props.ChangeFilter(filter, props.id);
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id);
    }

    const addTaskHandler =(title:string)=>{
        props.addTask(title,props.id);
    }

    const editTaskHAndler =(taskID:string,newTitle:string)=>{
        props.editTask(props.id,taskID,newTitle);
    }
    const editToDoListHandler = (newTitle:string)=>{
        props.editToDoList(props.id,newTitle);
    }

    return (
        <div>
            <h3>
                {/*{props.titleList}*/}
                <EditableSpan title={props.titleList} callback={editToDoListHandler}/>
                <button onClick={removeTodoListHandler}>X</button>
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
                                    ><input type="checkbox"
                                            checked={x.isDone}
                                            onChange={onChangeHandler}/>
                                      <EditableSpan title={x.title} callback={(newTitle)=>editTaskHAndler(x.id,newTitle)}/>
                                       {/* <span>{x.title}</span>*/}
                                        <button onClick={onClickHandler}>x
                                        </button>
                                    </li>
                                </div>

                            )
                        }
                    ) :
                    <span>Empty List</span>}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => filterClickHandler("all")}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => filterClickHandler("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => filterClickHandler("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;