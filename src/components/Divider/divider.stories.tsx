import React from "react";

import Divider from "./index";
import {Meta, Story} from "@storybook/react";
import {DividerProps} from "./divider";

const meta: Meta = {
    title: 'Divider',
    component: Divider,
}

export default meta;

export const Template: Story<DividerProps> = (props) => {

    return (<div>
        {props.type === "vertical" ?
            <div><span>A</span>
                <Divider {...props}/>
                <span>B</span></div>
            :
            [<Divider {...props}/>,
                <Divider {...props}>DividerText</Divider>]}
    </div>)
}

Template.storyName = 'Divider';
