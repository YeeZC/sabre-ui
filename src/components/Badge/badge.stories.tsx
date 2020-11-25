import React from "react";

import { Story, Meta } from '@storybook/react/types-6-0';

import Badge from './index';
import {BadgeProps} from "./badge";

const meta:Meta = {
    title: 'Badge',
    component: Badge
}

export default meta;

export const Template: Story<BadgeProps> = (props) => {
    return (<Badge {...props}>
        <div style={{height: 40, width: 40, backgroundColor: '#6c757d'}}/>
    </Badge>)
}

Template.storyName = "Badge";