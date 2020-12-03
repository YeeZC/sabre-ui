import React from "react";
import Table from '.';
import {Meta, Story} from '@storybook/react';
import {TableProps} from "./table";
import {Button} from "../../index";
import {Pagination, PaginationProps} from "./pagination";
import {action} from "@storybook/addon-actions";

const meta: Meta = {
    title: 'Table',
    component: Table
}

export default meta;

export const Template: Story<TableProps> = (props) => {
    return (<Table {...props} columns={
        [{
            title: 'A',
            dataIndex: 'a'
        }, {
            title: 'B',
            dataIndex: 'b'
        }, {
            title: 'C',
            dataIndex: 'c'
        }, {
            title: 'D',
            dataIndex: 'd',
            width: 80,
            render: (title, record) => {
                return <Button type={"link"}>{title}</Button>
            }
        }]
    } dataSource={[{
        a: 'hello',
        b: 'world',
        c: 'react',
        d: 'hahahah'
    }, {
        a: 'hello1',
        b: 'world1',
        c: 'react1',
        d: 'hahahah1'
    }, {
        a: 'hello2',
        b: 'world2',
        c: 'react2',
        d: 'hahahah2'
    }, {
        a: 'hello3',
        b: 'world3',
        c: 'react3',
        d: 'hahahah3'
    }]} pagination={{pages: [5], pageSize: 10, total: 100, onChange: action('onChange')}}/>)
}

Template.storyName = "Table";

export const Page: Story<PaginationProps> = (props) => {
    return (
        <Pagination total={100} current={1} pageSize={10}/>
    )
}

Page.storyName = "Pagination"