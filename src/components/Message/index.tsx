import React from 'react';
import { StatusType } from '../../data';
import classnames from 'classnames';

export declare interface MessageProps {
    type?: StatusType;
    className?: string;
    text: React.ReactNode;
    danger?: boolean;
}

const Message: React.FC<MessageProps> = (props) => {
    const {type, className, text, danger} = props;
    const classes = classnames('msg', className, {
        [`msg-${type}`]: type && !danger,
        'msg-danger': danger
    })

return (
<div className={classes}>
    {text}
    {props.children}
    </div>
    )
}

Message.defaultProps = {
    danger: false
}

export default Message;