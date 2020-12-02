import {ReactNode} from "react";
import {Theme} from "../../data";

export interface ProgressStrokeColor {
    /**
     * 起始颜色
     */
    from: string;
    to: string;
}

export interface ProgressProps {
    className?: string;
    strokeColor?: string | ProgressStrokeColor;
    strokeLinecap?: StrokeLinecap;
    strokeSize?: number;
    showInfo?: boolean;
    format?: (percent: number) => ReactNode;
    status?: Theme | 'active'
    size?: number | string;
    percent: number;
}

export type StrokeLinecap = 'round' | 'square';

export const colorMap = new Map<Theme, string>();
colorMap.set('primary', '#1890ff');
colorMap.set('secondary', '#6c757d');
colorMap.set('success', '#52c41a');
colorMap.set('info', '#13c2c2');
colorMap.set('warn', '#faad14');
colorMap.set('danger', '#f5222d');
colorMap.set('dark', '#343a40');
colorMap.set('primary', '#1890ff');
colorMap.set('primary', '#1890ff');