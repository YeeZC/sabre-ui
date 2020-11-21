import React from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import Icon from "../Icon";
import ReactDOM from "react-dom";
import App from "../../App";

export declare interface MessageProps {
    type?: StatusType;
    className?: string;
    text: React.ReactNode;
}

interface IconSelector {
    type: string;
    color: string
}

interface MessageProvider {
    success: (msg: string, duration: number) => void;
}

const selectIcon = (type: StatusType): IconSelector => {
    switch (type) {
        case "error":
            return {
                type: 'close-filled',
                color: 'danger'
            }
        case "success":
            return {
                type: 'check-filled',
                color: 'success'
            }
        case "warn":
            return {
                type: 'caution-filled',
                color: 'warn'
            }
        default:
            return {
                type: 'info-filled',
                color: 'primary'
            }
    }
}

const Message: React.FC<MessageProps> = (props) => {
    const {type, className, text} = props;
    const classes = classnames('msg', className, {
        [`msg-${type}`]: type,
    })

    return (
        <div className={classes}>
    <span className="msg-content">
        {type ? <Icon {...selectIcon(type)}/> : ''}
        {type? ' ': ''}
        {text}
        {props.children}
    </span>
        </div>
    )
}

Message.defaultProps = {
    type: "info"
}

export const message: MessageProvider = {
    success: msg => {
        ReactDOM.render(
                <Message text={msg} type={"success"}/>,
            document.getElementById('root')
        );
    }
}

export default Message;