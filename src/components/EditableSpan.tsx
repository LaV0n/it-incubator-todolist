import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType ={
    title:string
    callback:(newTitle:string)=>void
}

export function EditableSpan (props:EditableSpanType) {
   let [edit,setEdit] =useState(false);
   let [newTitle, setNewTitle]=useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       setNewTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler =() =>{
       setEdit(!edit);
       addTitle();
    }
    const addTitle = () => {
        if (newTitle !== "") {
            props.callback(newTitle);
        }
            }

    return (
        edit
            ? <TextField variant="outlined" autoFocus onBlur={onDoubleClickHandler} value={newTitle} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )
}