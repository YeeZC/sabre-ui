import React from 'react';
import {Meta, Story} from '@storybook/react'
import Result from './index';
import {ResultProps} from './result';

const meta: Meta = {
    title: 'Result',
    component: Result
}

export default meta;

export const Template: Story<ResultProps> = (props) => {
    return (
        <Result title="Title" subTitle="subTitle" status="success">
            <p>hhhhhhhh</p>
        </Result>
    )
}

Template.storyName = "Result"