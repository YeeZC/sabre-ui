import React from "react";
import {Meta, Story} from "@storybook/react";
import Tooltip from "./index";
import {TooltipProps} from "./tooltip";
import Button from "../Button";

const meta: Meta = {
    title: 'Tooltip',
    component: Tooltip,
    argTypes: {
        placement: {
            control: {
                type: 'select'
            },
            defaultValue: 'top'
        }
    }
}

export default meta;

export const Template:Story<TooltipProps> = (props) => {
    const target = {
        ...props,
        placement: props.placement || 'top',
        tip: props.tip || 'This is a tip'
    }
    return (<div style={{height: 300, display:"flex", alignItems: "center", justifyContent: "center"}}>
        <Tooltip {...target}>
        <Button type={'primary'} size={"large"}>Hover</Button>
    </Tooltip>
    </div>)
}

Template.storyName = 'Tooltip'