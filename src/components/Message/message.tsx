import React, {ReactNode, useEffect} from "react";
import Icon, {IconTheme} from "../Icon";
import {NotificationInstance} from "rc-notification/lib/Notification";
import Notification from "rc-notification";

let notification: NotificationInstance | undefined;


const show = (n: NotificationInstance, content: ReactNode, duration?: number) => {
    const key = new Date().getTime();
    n.notice({
        content,
        key,
        duration: duration || 2,
        onClose: () => {
            n.removeNotice(key)
        }
    })
}

export const render = (content: ReactNode, duration?: number) => {
    if (!notification) {
        Notification.newInstance({
            prefixCls: 'ui-msg'
        }, (n) => {
            notification = n
            show(n, content, duration)
        });
    } else {
        show(notification, content, duration)
    }

}

interface IconSelector {
    type: string;
    theme: IconTheme
}

export declare interface MessageProps {
    type: StatusType;
    className?: string;
    text: React.ReactNode;
}

const selectIcon = (type: StatusType): IconSelector => {
    switch (type) {
        case "error":
            return {
                type: 'close-filled',
                theme: 'danger'
            }
        case "success":
            return {
                type: 'check-filled',
                theme: 'success'
            }
        case "warn":
            return {
                type: 'caution-filled',
                theme: 'warn'
            }
        default:
            return {
                type: 'info-filled',
                theme: 'primary'
            }
    }
}

const Message: React.FC<MessageProps> = (props) => {
    const {type, text} = props;
    useEffect(() => {
        return () => {
            if (notification) {
                const {notices} = notification.component.state;
                if (notices.length === 0) {
                    notification.destroy();
                    notification = undefined
                }
            }
        }
    }, [])
    return (<span className="ui-msg-item"><Icon {...selectIcon(type)}/><i className="ui-msg-item-content">{text}</i></span>)
}

Message.defaultProps = {
    type: "info",
}

export default Message;