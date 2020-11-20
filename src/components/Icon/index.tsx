import React from 'react';
import classname from "classnames";

export declare interface IconProps {
    type: string,
    spinning?: boolean
}

const Icon: React.FC<IconProps> = ({type, spinning}) => {
    const classes = classname('icon', {
        [`icon-${type}`]: type,
        'icon-spin': spinning
    })

    return (<span><i className={classes} style={{color: "black"}}>test</i></span>)
}

Icon.defaultProps = {
    spinning: false
}

export default Icon;