import React, {MouseEventHandler, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import Icon from "../Icon";
import {Theme} from "../../data";

export interface TagProps  {
    className?: string;
    text: string;
    icon?: ReactNode;
    color?: Theme | string;
    closable?: boolean;
    onClose?: MouseEventHandler
}

export const Tag:React.FC<TagProps> = (props) => {
    const {text, icon, color, closable, onClose, className} = props;
    const [closed, setClosed] = useState(false);
    const useTheme = () => {
        if (color) {
            switch (color) {
                case "danger":
                case "info":
                case "primary":
                case "success":
                case "warn":
                case "dark":
                case "secondary":
                    return color;
            }
        }
        return undefined;
    }
    const theme = useTheme();
    const classes = classNames('ui-tag', className, {
        [`ui-tag-${theme}`]: theme,
        'ui-tag-closable': closable,
        'ui-tag-closed': closable && closed
    })

    let style:React.CSSProperties = {}

    useEffect(() => {
        console.log('closed', text , closed)
    }, [closed])

    if (!theme && color) {
        style = {
            color: "white",
            backgroundColor: color
        }
    }

    let timeout: NodeJS.Timeout;
    const handleClosed: MouseEventHandler = (e) => {
        e.preventDefault()
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            setClosed(true)
            if (onClose) {
                onClose(e);
            }
        }, 300)

        e.stopPropagation();
    }

    return (<span className={classes} style={style}>
        {icon? <span className={'ui-tag-icon'}>{icon}</span> : ''}
        <span className={'ui-tag-text'}>{text}</span>
        {closable? <span className={'ui-tag-close'} onClick={handleClosed}><Icon type={'cross'}/> </span>: ''}
    </span>)
}

Tag.defaultProps = {
    color: "secondary"
}
