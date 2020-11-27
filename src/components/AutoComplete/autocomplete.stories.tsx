import React from "react";

import { Story, Meta } from '@storybook/react/types-6-0';
import AutoComplete from "./index";
import {AutoCompleteProps, Data} from "./auto";


const meta:Meta = {
    title: 'AutoComplete',
    component: AutoComplete,
}

export default meta;

export const Template: Story<AutoCompleteProps> = (props) => {
    const data: Data<any>[] = [{
        label: 'aaaaa',
        value: 'aaaaa'
    },
        {
            label: 'bbbb',
            value: 'bbbb'
        },{
            label: 'ccca',
            value: 'ccca'
        }]
    return (<AutoComplete fetch={(async keyword => {
        return data.filter(item => item.label.includes(keyword))
    })}/>)
}

Template.storyName = "AutoComplete";