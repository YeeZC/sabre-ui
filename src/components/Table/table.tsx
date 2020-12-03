import React from "react";
import classNames from "classnames";
import {Column, TableDataType} from "./data";
import {Empty} from "../../index";
import {Pagination, PaginationProps} from "./pagination";

export interface TableProps<T = {}> {
    columns: Column<T>[];
    className?: string;
    dataSource?: TableDataType<T>[];
    pagination?: PaginationProps
}

export const Table: React.FC<TableProps> = (props) => {
    const {columns, dataSource, className, pagination} = props;
    const renderTbody = () => {
        if (dataSource && dataSource.length > 0) {
            return (dataSource || []).map((item, idx) => {
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
                {renderTbody()}
                </tbody>
            </table>
            {pagination ? <Pagination {...pagination}/> : ''}
        </>
    );
}