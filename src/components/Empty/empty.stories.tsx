import React from "react";

import {Meta, Story} from '@storybook/react/types-6-0';
import {Empty, EmptyProps} from "./empty";


const meta: Meta = {
    component: Empty,
    title: 'Empty',
}

export default meta;

export const Template: Story<EmptyProps> = (props) => {
    // retrieves the appropriate icon passes it as a component prop
    return (<Empty/>);
};

Template.storyName = 'Empty';