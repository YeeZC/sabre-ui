import React from "react";
import {Meta, Story} from "@storybook/react";
import Input from "./index";
import {InputPropsBase} from "./common";

const meta: Meta = {
    title: 'TextArea',
    component: Input.TextArea,
}

export default meta;

export const DefaultInput: Story<InputPropsBase> = (props) => {
    return (
        <Input.TextArea {...props} size={"large"} autoSize={10}/>
    )
}

DefaultInput.storyName = "TextArea"
