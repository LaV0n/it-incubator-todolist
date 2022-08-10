import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from './Task';


export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: action("Status changed inside Task"),
    changeTaskTitle: action("Title changed inside Task"),
    removeTask: action("Remove button inside Task was clicked")
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
   task:{id:'1',isDone:true, title:"JS"},
    todolistId:"todoListId1"
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task:{id:'1',isDone:false, title:"JS"},
    todolistId:"todoListId1"
};


