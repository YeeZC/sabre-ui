import React from 'react';
import classnames from 'classnames';

export declare interface MessageProps {
    type?: StatusType;
    className?: string;
    text: React.ReactNode;
}

const Message: React.FC<MessageProps> = (props) => {
    const {type, className, text} = props;
    const classes = classnames('msg', className, {
        [`msg-${type}`]: type,
    })

return (
<div className={classes}>
    <span className="msg-content">
    {text}
    {props.children}
    </span>
    </div>
    )
}

Message.defaultProps = {
    type: "info"
}

export default Message;