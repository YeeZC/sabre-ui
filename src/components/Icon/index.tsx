import React from 'react';
import classname from "classnames";


export declare interface IconProps {
    type: string;
    spinning?: boolean;
    className?: string;
    color?: string;
}


const Icon: React.FC<IconProps> = ({type, color, className, spinning}) => {
    const classes = classname('icon', 'ui-icon', className, {
        [`icon-${type}`]: type,
        [`icon-${color}`]: !!color,
        'icon-auto': !color,
        'icon-spin': spinning
    })
    return (<i className={classes} />)
}

Icon.defaultProps = {
    spinning: false,
}

export default Icon;