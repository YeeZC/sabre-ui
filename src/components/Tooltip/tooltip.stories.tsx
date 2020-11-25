import React from "react";
import {Meta, Story} from "@storybook/react";
import Tooltip from "./index";
import {TooltipProps} from "./tooltip";
import Button from "../Button";

const meta: Meta = {
    title: 'Tooltip',
    component: Tooltip
}

export default meta;

export const Template:Story<TooltipProps> = (props) => {
    const target = {
        ...props,
        tip: props.tip || 'This is a tip'
    }
    return (<Tooltip {...target}>
        <Button type={'primary'}>Click</Button>
    </Tooltip>)
}

Template.storyName = 'Tooltip'