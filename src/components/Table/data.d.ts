import {ReactNode} from "react";

export type TableDataType<T = {}> = { [key: string]: any } & T

export interface Column<T = {}> {
    title: string;
    dataIndex: string;
    align?: 'left' | 'right' | 'center';
    render?: (defaultVal: any, record: TableDataType<T>) => ReactNode;
    width?: number | string
}

export interface TableDataList<T = {}> {
    total?: number;
    current?: number;
    pageSize?: number;
    data: TableDataType<T>[]
}

export interface RequestParam {
    current?: number;
    pageSize?: number;
}