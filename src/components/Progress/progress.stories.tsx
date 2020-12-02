import React from "react";
import {Meta, Story} from "@storybook/react";
import Progress from "./index";
import {ProgressProps} from "./common";

const meta: Meta = {
    title: 'Progress',
    component: Progress
}

export default meta;

export const Template: Story<ProgressProps> = (props) => {
    return (<Progress {...props} size={300}/>)
}

Template.storyName = "Progress"