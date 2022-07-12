import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputType ={
    callback:(value:string)=> void
}

export function Input (props:InputType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onclickHandler = () => {
        if (title.trim() !== "") {
            props.callback(title);
            setTitle('');
        }else{
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
            <input className={error ?"error": ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={onclickHandler}>+</button>
            { error &&  <div className="error-message">{error}</div>}
        </div>
    )
}
