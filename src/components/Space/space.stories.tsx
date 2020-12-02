import React from "react";
import {Meta, Story} from "@storybook/react";
import Space, {SpaceProps} from "../Space";
import Button from "../Button";

const meta: Meta = {
    title: 'Space',
    component: Space
}

export default meta;

export const Template: Story<SpaceProps> = (props) => {

    return (<Space {...props}>
        <Button type={"primary"}>First</Button>
        <Button type={"primary"}>Second</Button>
        <Button type={"primary"}>Third</Button>
    </Space>)
}

Template.storyName = "Space"