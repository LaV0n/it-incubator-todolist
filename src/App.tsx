import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {TaskType} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskStateType ={
    [key:string]:Array<TaskType>
}

function App() {

    let todoListId1=v1();
    let todoListId2=v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all"
        }
    ])

    let [tasks,setTasks]= useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "French", isDone: false},
            {id: v1(), title: "Belarussian", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Apples", isDone: true}
        ]
    });

    function ChangeFilter(value: FilterValueType, todoListId:string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter =value;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(id: string,todoListId:string) {
        let todoListTasks=tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(x => x.id !== id)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId:string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks=tasks[todoListId];
        tasks[todoListId]=[newTask,...todoListTasks];
        setTasks({ ...tasks});
    }

    function ChangeStatus(id: string, isDone: boolean, todoListId:string) {
        let todoListTasks=tasks[todoListId];
        let desiredTask = todoListTasks.find(t => t.id === id);
        if (desiredTask) {
            desiredTask.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList (id:string) {
        setTodoLists(todoLists.filter(tl=> tl.id !==id));
        delete tasks[id];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let allTodoListTasks =tasks[tl.id];
                    let task_ForToDo = allTodoListTasks;
                    if (tl.filter === "active") {
                        task_ForToDo = allTodoListTasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        task_ForToDo = allTodoListTasks.filter(t => t.isDone === true)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            titleList={tl.title}
                            tasks={task_ForToDo}
                            removeTask={removeTask}
                            ChangeFilter={ChangeFilter}
                            addTask={addTask}
                            ChangeStatus={ChangeStatus}
                            filter={tl.filter}
                            removeTodoList = {removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
