import React, {MouseEventHandler} from 'react';
import classname from "classnames";
import {SizeType, Theme} from "../../data";


export declare interface IconProps {
    type: string;
    spinning?: boolean;
    className?: string;
    theme?: Theme;
    size?: SizeType | number;
    onClick?: MouseEventHandler;
}

const Icon: React.FC<IconProps> = ({type, theme, className, size, spinning, onClick}) => {
    const classes = classname('ui-icon', className, {
        [`ui-icon-${type}`]: type,
        [`ui-icon-theme-${theme}`]: !!theme,
        [`ui-icon-size-${size}`]: typeof size === "string",
        'ui-icon-auto': !theme,
        'ui-icon-spin': spinning,
    })
    let style = {};
    if (typeof size === "number") {
        style = {
            fontSize: `${size}rem`,
        }
    }
    return (<i className={classes} style={style} onClick={(e) => {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
        e.stopPropagation()
    }
    }/>)
}

Icon.defaultProps = {
    spinning: false,
}

export default Icon;