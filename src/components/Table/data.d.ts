import {ReactNode} from "react";

export type TableDataType<T = {}> = { [key: string]: any } & T

export interface Column<T = {}> {
    title: string;
    dataIndex: string;
    align?: 'left' | 'right' | 'center';
    render?: (defaultVal: any, record: TableDataType<T>) => ReactNode;
    width?: number | string
}

export interface RequestParam {
    current: number;
    pageSize: number;
}