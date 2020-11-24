import React from 'react';
import classname from "classnames";


export declare interface IconProps {
    type: string;
    spinning?: boolean;
    className?: string;
    theme?: Theme;
    size?: SizeType | number
}

const Icon: React.FC<IconProps> = ({type, theme, className, size, spinning}) => {
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
    return (<i className={classes} style={style}/>)
}

Icon.defaultProps = {
    spinning: false,
}

export default Icon;