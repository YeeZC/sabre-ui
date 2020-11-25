import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Placement} from "../../data";
import Notification from "rc-notification";
import {NotificationInstance} from "rc-notification/lib/Notification";

export interface TooltipProps {
    tip: ReactNode;
    placement?: Placement;
}

interface Point {
    x: number;
    y: number;
}

const getPoint = (element: HTMLElement):Point => {
    let elm: HTMLElement | null = element;
    let y = 0;
    let x = 0;
    do {
        y += elm.offsetTop;
        x += elm.offsetLeft;
        elm = (elm.offsetParent as HTMLElement);
    } while (elm)
    return {
        x: element.offsetWidth + x,
        y: + y
    }
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
    const {tip, placement, children} = props;
    const [key] = useState(new Date().getTime());
    const [notification, setNotification] = useState<NotificationInstance>();
    const ref = useRef<HTMLDivElement>();

    return (<div style={{
        display: "inline-block"
    }} ref={(r) => {
        if (r) {
            ref.current = r
        }
    }} onMouseEnter={(e) => {
        // const {offsetHeight, offsetWidth} = e.target;
        // Notification.newInstance({
        //     style: {
        //         top: offsetHeight,
        //         left: offsetWidth
        //     },
        //     prefixCls: 'ui-tooltip'
        // }, n => {
        //     setNotification(n)
        //     n.notice({
        //         content: tip,
        //         duration: null,
        //         key,
        //     })
        // })
    }} onMouseLeave={() => {
        notification?.removeNotice(key)
    }}>
        {children}
    </div>)
}

Tooltip.defaultProps = {
    placement: "top"
}

Tooltip.displayName = 'Tooltip'