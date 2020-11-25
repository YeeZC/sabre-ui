import React, {ReactNode} from "react";
import {StatusType} from "../../data";

export interface BadgeProps {
    className?: string;
    style?: React.CSSProperties;
    count?: number | ReactNode;
    status?: StatusType;
    text?: ReactNode;
    overflowCount?: number
}

export const Badge: React.FC<BadgeProps> = (props) => {
    return <span>
        {props.children}
        <sup>{props.count}</sup>
    </span>
}