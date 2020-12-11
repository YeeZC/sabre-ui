import React, {useState} from "react";
import Table from '.';
import {Meta, Story} from '@storybook/react';
import {TableProps} from "./table";
import {Button} from "../../index";
import {Pagination, PaginationProps} from "./pagination";
import axios from "axios";

const meta: Meta = {
    title: 'Table',
    component: Table
}

export default meta;

export const Template: Story<TableProps> = (props) => {
    const [data, setData] = useState({
        current: 1,
        pageSize: 10,
        total: 100,
        data: []
    });
    return (<Table {...props}
                   columns={
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
                   }
                   dataSource={data.data}
                   pagination={{
                       pages: [5],
                       pageSize: data.pageSize,
                       total: data.total,
                       onChange: (current: number, pageSize: number) => {
                           axios.get('https://www.easy-mock.com/mock/5fc91aec4d953a64bd0fc173/sabre/table', {
                               params: {
                                   current,
                                   pageSize
                               }
                           }).then(resp => {
                               console.log('a', resp)
                               setData(resp.data.data)
                           })
                       }
                   }}/>)
}

Template.storyName = "Table";