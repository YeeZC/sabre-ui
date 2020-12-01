import React from "react";
import {Meta, Story} from "@storybook/react";
import Form from ".";
import {FormProps} from "./form";
import {Input, Select} from "../../index";

const meta: Meta = {
    title: 'Form',
    component: Form
}

export default meta;

export const Template: Story<FormProps> = (props) => {
    return (
        <Form {...props}>
            <Form.Item name={"name"} label={"名称"} tooltip={"help"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"abc"} label={"类型"}>
                <Select/>
            </Form.Item>


            <Form.Item name={"abc"} label={"类型"}>
                <Input.Password/>
            </Form.Item>
        </Form>
    )
}

Template.storyName = "Form"