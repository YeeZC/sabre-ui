import React from "react";
import {Meta, Story} from "@storybook/react";

import Tabs from './index';
import {TabsProps} from "./tabs";

const meta: Meta = {
    title: 'Tabs',
    component: Tabs
}

export default meta;

export const Template: Story<TabsProps> = (props) => {
    return (
        <div>
            <Tabs {...props}>
                <Tabs.Tab title={'Tab1'}>
                    Content 1
                </Tabs.Tab>
                <Tabs.Tab title={'Tab2'}>
                    Content 2
                </Tabs.Tab>
            </Tabs>
        </div>)
}

Template.storyName = 'Tabs'