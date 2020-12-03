import React from "react";
import classNames from "classnames";
import {Column, TableDataList, TableDataType} from "./data";
import {Empty} from "../../index";
import {Pagination, PaginationProps} from "./pagination";

export interface TableProps<T = {}> {
    columns: Column<T>[];
    className?: string;
    dataSource?: TableDataType<T>[];
    pagination?: PaginationProps
}

interface TableState<T = {}> {
    dataSource?: TableDataList<T>;
}

export class Table<T = {}> extends React.Component<TableProps<T>, TableState<T>> {

    state = {
        dataSource: {
            data: []
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: {
                data: this.props.dataSource || []
            }
        })
    }

    renderTbody = () => {
        const {columns} = this.props;
        const {dataSource} = this.state;
        if (dataSource.data.length > 0) {
            return (dataSource.data || []).map((item, idx) => {
                return (
                    <tr key={idx}>
                        {columns.map((col, index) => {
                            const {render, dataIndex} = col;
                            const align = col.align || "left";
                            return (
                                <td key={index} width={col.width} style={{
                                    textAlign: align,
                                    flex: !col.width ? 1 : 'none'
                                }}>
                                    {render ? render(item[dataIndex], item) : item[dataIndex]}
                                </td>
                            )
                        })}
                    </tr>
                )
            })
        }
        return (
            <tr>
                <td colSpan={columns.length}>
                    <Empty/>
                </td>
            </tr>
        )
    }

    render() {
        const {columns, className, pagination} = this.props;
        const classes = classNames('ui-table', className)
        return (
            <>
                <table className={classes}>
                    <thead>
                    <tr>
                        {columns.map((item, idx) => {
                            const props: any = {};
                            if (item.width) {
                                props.style = {
                                    width: item.width,
                                    flex: 'none'
                                } as React.CSSProperties;
                            }
                            return <th className={'ui-table-th'} key={idx} {...props}>
                                {item.title}
                            </th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTbody()}
                    </tbody>
                </table>
                {pagination ? <Pagination {...pagination}/> : ''}
            </>
        );
    }
}