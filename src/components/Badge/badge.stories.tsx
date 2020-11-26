import React from "react";

import { Story, Meta } from '@storybook/react/types-6-0';

import Badge from './index';
import {BadgeProps} from "./badge";
import Space from "../Space";

const meta:Meta = {
    title: 'Badge',
    component: Badge,
    argTypes: {
        count: {
            control: {
                type: 'range',
                min: 0,
                max: 100
            },
            defaultValue: 0
        }
    }
}

export default meta;

export const Template: Story<BadgeProps> = (props) => {
    return (
        <Space direction={"vertical"}>
        <Badge {...props} count={'hello'}>
            <div style={{height: 40, width: 40, backgroundColor: '#ced4da'}}/>
        </Badge>
            <Badge dot status={"success"} text={'he'}/>
            <Badge dot status={"error"}/>

    </Space>)
}

Template.storyName = "Badge";