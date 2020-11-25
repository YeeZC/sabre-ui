import React from "react";
import {Meta, Story} from "@storybook/react";
import Input from "./index";
import {InputPropsBase} from "./common";
import Space from "../Space";

const meta: Meta = {
    title: 'Input',
    component: Input,
}

export default meta;

export const DefaultInput: Story<InputPropsBase> = (props) => {
    return (
        <Space direction={"vertical"}>
            <Input {...props}/>
            <Input.Text {...props}/>
            <Input.Password {...props}/>
        </Space>
        )
}

DefaultInput.storyName = "Input"