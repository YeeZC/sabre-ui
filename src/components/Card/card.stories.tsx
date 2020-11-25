import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Card from "./index";
import {CardProps} from "./card";

const meta: Meta = {
    title: 'Card',
    component: Card,
    argTypes: {
        title: {
            defaultValueL: 'Title'
        }
    }
}

export default meta;

export const Template: Story<CardProps> = (props) => {
    return (<Card {...props} onClick={action('Card clicked')}>
        Content
    </Card>)
}

Template.storyName = "Card"