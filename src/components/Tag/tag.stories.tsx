import React from "react";
import {Meta, Story} from "@storybook/react";
import Tag from './index';
import {TagProps} from "./tag";
import Space from "../Space";

const meta: Meta = {
    title: 'Tag',
    component: Tag
}

export default meta;

export const Template: Story<TagProps> = (props) => {
    const target = {
        ...props,
        text: props.text || 'Tag'
    }
    return <Space><Tag {...target}/></Space>
}

Template.storyName = "Tag"