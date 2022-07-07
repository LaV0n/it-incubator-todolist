import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import "./App.css";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id:string
    titleList: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId:string) => void
    ChangeFilter: (value: FilterValueType, todoListId:string) => void
    addTask: (title: string,todoListId:string) => void
    ChangeStatus: (id: string, isDone: boolean, todoListId:string) => void
    filter:FilterValueType
    removeTodoList:(id:string)=>void
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onclickHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title,props.id);
            setTitle('');
        }else{
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            onclickHandler()
        }
    }
    const filterClickHandler =(filter:FilterValueType) => {
        props.ChangeFilter(filter, props.id);
    }

    const removeTodoListHandler =()=>{
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3>{props.titleList}
                <button onClick={removeTodoListHandler}>X</button>
            </h3>
            <div>
                <input className={error ?"error": ""}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button onClick={onclickHandler}>+</button>
                { error &&  <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.length  ?
                    props.tasks.map((x) => {
                            const onClickHandler = () => {
                                props.removeTask(x.id,props.id)
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
                                    className={x.isDone ? "is-done": ""}
                                    ><input type="checkbox"
                                              checked={x.isDone}
                                              onChange={onChangeHandler}/>
                                        <span>{x.title}</span>
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
                <button className={ props.filter === "all" ? "active-filter" :""}
                        onClick={()=>filterClickHandler("all")}>All</button>
                <button className={ props.filter === "active" ? "active-filter" :""}
                        onClick={()=>filterClickHandler("active")}>Active</button>
                <button className={ props.filter === "completed" ? "active-filter" :""}
                        onClick={()=>filterClickHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;