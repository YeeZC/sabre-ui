import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import Radio from './index'
import {RadioProps} from "./radio";
import Space from "../Space";

const meta: Meta = {
    title: 'Radio',
    component: Radio
}

export default meta;

export const Template: Story<RadioProps> = (props) => {
    return <Space direction={"vertical"}>
        <Radio.Group onChange={action('radio')}>
            <Radio {...props} value={"hello"} checked>Hello</Radio>
            <Radio value={"world"}>World</Radio>
        </Radio.Group>
        <Radio.Group onChange={action('radio.button')} buttonStyle={"outline"}>
            <Radio.Button value={"hello"}>Hello</Radio.Button>
            <Radio.Button value={"world"}>World</Radio.Button>
            <Radio.Button value={"xiaoming"} disabled>Xiaoming</Radio.Button>
        </Radio.Group>
    </Space>
}

Template.storyName = "Radio"