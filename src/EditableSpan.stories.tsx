import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";



export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes:{
        onChange:{
            description:"value editableSpan was changed"
        },
        value: {
            defaultValue:"HTML",
            description:"start value EditableSpan"
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
   onChange:action("value editableSpan was changed")
};



