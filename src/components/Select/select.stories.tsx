import React from "react";
import {Meta, Story} from "@storybook/react";
import Select from "./index";
import {SelectProps} from "./select";
import {action} from "@storybook/addon-actions";

const meta: Meta = {
    title: 'Select',
    component: Select,
}

export default meta;

export const DefaultInput: Story<SelectProps> = (props) => {
    return (
        <Select onChange={action('onChange')}>
            <Select.Option label={'hello'} value={'hello'}/>
            <Select.Option label={'child'} value={'child'}/>
        </Select>
    )
}

DefaultInput.storyName = "Select"