import React, {ReactNode} from "react";
import {StatusType} from "../../data";
import classNames from "classnames";
import {testColor} from "../../utils";
import animation from "../Animation";

export interface BadgeProps {
    className?: string;
    style?: React.CSSProperties;
    count?: number | ReactNode;
    status?: StatusType;
    text?: ReactNode;
    overflowCount?: number;
    dot?: boolean;
    color?: string
}

export const Badge: React.FC<BadgeProps> = (props) => {
    const {className, style, count, status, text, overflowCount, dot, children, color} = props
    const classes = classNames('ui-badge', className, {
        [`ui-badge-${status}`]: status,
        'ui-badge-dot': dot,
        'ui-badge-no-content': text || !children
    })

    const formatCount = () => {
        if (dot || text) {
            return '';
        }
        if (typeof count === "number" && overflowCount) {
            return count > overflowCount ? `${overflowCount}+` : count;
        }
        return count;
    }

    const colorStyle = ():React.CSSProperties => {
        if (testColor(color)) {
            return {
                backgroundColor: color
            }
        }
        return {};
    }

    const isShow = (): boolean => {
        if (status || text) {
            return true;
        }
        if (typeof count === "number") {
            return count > 0;
        }
        return count !== undefined;
    }

    const renderContent = () => {
        return text ? <span className={'ui-badge-text-inner'}>{text}</span> : children;
    }

    return <span className={classes} style={style}>
        {renderContent()}
        {animation.animate(<sup className={'ui-badge-count'} style={colorStyle()}>
            {formatCount()}
        </sup>, {
            type: "zoom-in-bottom",
            timeout: 300,
            show: isShow(),
            wrapper: true
        })}
    </span>
}