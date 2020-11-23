import React, {MouseEventHandler, ReactNode, useState} from "react";
import classNames from "classnames";
import Icon from "../Icon";

interface TagProps {
    text: string;
    icon?: ReactNode;
    color?: Theme | string;
    closable?: boolean;
    onClose?: MouseEventHandler
}

const Tag:React.FC<TagProps> = (props) => {
    const {text, icon, color, closable, onClose} = props;
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
    const classes = classNames('ui-tag', {
        [`ui-tag-${theme}`]: theme,
        'ui-tag-closable': closable,
        'ui-tag-closed': closed
    })

    let style:React.CSSProperties = {}

    if (!theme && color) {
        style = {
            color: "white",
            backgroundColor: color
        }
    }

    const handleClosed: MouseEventHandler = (e) => {
        setClosed(true)
        if (onClose) {
            onClose(e);
        }
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

export default Tag;