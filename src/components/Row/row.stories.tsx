import React from "react";
import {Meta, Story} from "@storybook/react";
import Row from "./index";
import {RowProps} from "./row";
import Space from "../Space";

const meta: Meta = {
    title: 'Row',
    component: Row
}

export default meta;

export const Template: Story<RowProps> = (props) => {
    return (
        <Space direction={"vertical"}>
            <Row {...props}>
                <Row.Col span={24} style={{justifyContent: "center",
                    backgroundColor: '#1890ff', color: 'white'}}>Col-24</Row.Col>
            </Row>
            <Row {...props}>
                <Row.Col span={12} style={{justifyContent: "center",
                    borderRight: '1px solid white',
                    backgroundColor: '#1890ff', color: 'white'}}>Col-12</Row.Col>
                <Row.Col span={12} style={{justifyContent: "center",
                    backgroundColor: '#1890ff', color: 'white'}}>Col-12</Row.Col>
            </Row>
            <Row {...props}>
                <Row.Col span={6} style={{justifyContent: "center",
                    borderRight: '1px solid white',
                    backgroundColor: '#1890ff', color: 'white'}}>Col-6</Row.Col>
                <Row.Col span={4} style={{justifyContent: "center",
                    borderRight: '1px solid white',
                    backgroundColor: '#1890ff', color: 'white'}}>Col-4</Row.Col>
                <Row.Col span={9} style={{justifyContent: "center",
                    borderRight: '1px solid white',
                    backgroundColor: '#1890ff', color: 'white'}}>Col-9</Row.Col>
                <Row.Col span={5} style={{justifyContent: "center",
                    backgroundColor: '#1890ff', color: 'white'}}>Col-5</Row.Col>
            </Row>
        </Space>)
}

Template.storyName = "Row"