import React from "react";
import {Meta, Story} from "@storybook/react";
import Link, {LinkProps} from "./index";

const meta: Meta = {
    title: 'Link',
    component: Link
}

export default meta;

export const Template: Story<LinkProps> = (props) => {
    return (<Link {...props}>Link</Link>)
}

Template.storyName = 'Link'