import React from "react";

import {Meta, Story} from '@storybook/react/types-6-0';

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
    return (
        <Button.Group size={"mini"}>
            <Button {...props}>T</Button>
            <Button {...props}>T</Button>
            <Button {...props}>T</Button>
        </Button.Group>
    );
};

Template.storyName = 'Button';