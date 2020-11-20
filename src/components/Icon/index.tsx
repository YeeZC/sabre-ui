import React from 'react';
import classname from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {IconName} from "@fortawesome/fontawesome-common-types";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export declare interface IconProps {
    type: IconName;
    spinning?: boolean;
    className?: string;
    color?: string;
}


const Icon: React.FC<IconProps> = ({type, color, className, spinning}) => {
    const classes = classname('icon', className, {
        [`icon-${type}`]: type,
        [`icon-${color}`]: !!color,
        'icon-auto': !color
    })
    return (<FontAwesomeIcon className={classes} icon={{
        prefix: "fas",
        iconName: type
    }} spin={spinning} color={color}/>)
}

Icon.defaultProps = {
    spinning: false,
}

export default Icon;