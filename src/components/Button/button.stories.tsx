import React from "react";

import { Story, Meta } from '@storybook/react/types-6-0';

import Button from "./index";
import {ButtonProps} from "./button";

const meta: Meta = {
        component: Button,
        title: 'Button',
}

export default meta;

export const Template: Story<ButtonProps> = (props) => {
        // retrieves the appropriate icon passes it as a component prop
        const {type, size} = props;
        return (<Button {...props}>T</Button>);
};

Template.storyName = 'Button';