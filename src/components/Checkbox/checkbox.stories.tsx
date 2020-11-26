import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Checkbox from './index'
import {CheckboxProps} from "./checkbox";
import Space from "../Space";

const meta: Meta = {
    title: 'Checkbox',
    component: Checkbox,
}

export default meta;

export const Template: Story<CheckboxProps> = (props) => {
    return <Space direction={"vertical"}>
        <Checkbox.Group onChange={action('checkbox')}>
            <Checkbox {...props} value={"hello"}>Hello</Checkbox>
            <Checkbox value={"world"} indeterminate={props.indeterminate} checked>World</Checkbox>
        </Checkbox.Group>
    </Space>
}

Template.storyName = "Checkbox"