import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Radio from './index'
import {RadioProps} from "./radio";

const meta: Meta = {
    title: 'Radio',
    component: Radio
}

export default meta;

export const Template: Story<RadioProps> = (props) => {
    return <Radio.Group onChange={action('a')}>
        <Radio value={"hello"}>Hello</Radio>
        <Radio value={"world"}>World</Radio>
    </Radio.Group>
}

Template.storyName = "Radio"