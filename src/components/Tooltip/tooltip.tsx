import React, {ReactNode, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Placement} from "../../data";
import animation, {AnimationType} from "../Animation";
import {testColor} from "../../utils";

export interface TooltipProps {
    tip: ReactNode;
    placement?: Placement;
    color?: string;
    className?: string;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
    const {tip, placement, children, color, className} = props;
    const [show, setShow] = useState(false)
    const classes = classNames('ui-tooltip', className, {
        [`ui-tooltip-${placement}`]: placement
    })

    const zoom:AnimationType = classNames({
        'zoom-in-top': placement === "bottom",
        'zoom-in-bottom': placement === "top",
        'zoom-in-left': placement === "right",
        'zoom-in-right': placement === "left",
    }) as AnimationType;

    const style = testColor(color) ? {
            backgroundColor: color
        }: {}

    let timer: any;
    return (<div className={classes} onMouseEnter={(e) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(()=> {
            setShow(true)
        }, 100)

    }} onMouseLeave={() => {
        setShow(false)
    }}>
        {children}
        {animation.animate(<div className={'ui-tooltip-content'} style={style}><span>{tip}</span></div>, {
            type: zoom,
            show,
            timeout: 200
        })}
    </div>)
}

Tooltip.defaultProps = {
    placement: "top"
}

Tooltip.displayName = 'Tooltip'