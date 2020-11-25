import React from "react";
import {Meta, Story} from "@storybook/react";
import Menu from "./index";
import {MenuProps} from "./menu";

const meta: Meta = {
    title: 'Menu',
    component: Menu
}

export default meta;

export const Template: Story<MenuProps> = (props) => {
    return (<Menu {...props}>
        <Menu.Item>MenuItem 1</Menu.Item>
        <Menu.Item disabled>MenuItem 2</Menu.Item>
        <Menu.Item>MenuItem 3</Menu.Item>
        <Menu.SubMenu title={"Sub Menu"}>
            <Menu.Item>SubMenu Item 1</Menu.Item>
            <Menu.Item>SubMenu Item 2</Menu.Item>
            <Menu.Item>SubMenu Item 3</Menu.Item>
        </Menu.SubMenu>
    </Menu>)
}

Template.storyName = "Menu"