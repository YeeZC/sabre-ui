import React from "react";
import {Meta, Story} from "@storybook/react";
import Tag from './index';
import {TagProps} from "./tag";

const meta: Meta = {
    title:'Tag',
    component: Tag
}

export default meta;

export const Template: Story<TagProps> = (props) => {
    const target = {
        ...props,
        text: props.text || 'Tag'
    }
    return <Tag {...target}/>
}

Template.storyName = "Tag"