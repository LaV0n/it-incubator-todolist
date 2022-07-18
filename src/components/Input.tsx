import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type InputType = {
    callback: (value: string) => void
}

export function Input(props: InputType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onclickHandler = () => {
        if (title.trim() !== "") {
            props.callback(title);
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            onclickHandler()
        }
    };


    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       label="Title"
                       helperText={error}
                       />
            <IconButton
                    color="primary"
                    onClick={onclickHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )
}
