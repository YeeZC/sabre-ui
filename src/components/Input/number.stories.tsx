import React from "react";
import {Meta, Story} from "@storybook/react";
import Input from "./index";
import {NumberProps} from "./number";

const meta: Meta = {
    title: 'Input.Number',
    component: Input.Number,
    argTypes: {
        value: {
            control: {
                type: 'range',
                min: 0,
                max: 100
            }
        },
        defaultValue: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            defaultValue: 10
        }
    }
}

export default meta;

export const DefaultInput: Story<NumberProps> = (props) => {
    return (
            <Input.Number {...props}/>
        )
}

DefaultInput.storyName = "Input.Number"
