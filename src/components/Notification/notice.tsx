import React, {ReactNode} from "react";
import classname from "classnames";
import Button from "../Button";
import {NotificationInstance} from "rc-notification/lib/Notification";
import Notification from "rc-notification";

export declare interface NotificationProps {
    placement?: NotificationPlacement;
    title?: ReactNode;
    icon?: ReactNode;
    content?: ReactNode;
    duration?: number | null;
    closable?: boolean;
    onClose?: VoidCall;
    onConfirm?: VoidCall;
    confirmText?: ReactNode;
    onCancel?: VoidCall;
    cancelText?: ReactNode;
}

export type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const Notice: React.FC<NotificationProps> = ({title, icon, content, ...rest}) => {
    return (<div className={'ui-notice'}>
        <span className={classname({'ui-notice-icon': icon})}>{icon}</span>
        <span>
            {title ? <h3 className={classname({'ui-notice-title': title})}>{title}</h3> : ''}
            <div className={classname({
                'ui-notice-content': content,
                'ui-notice-margin-icon': icon
            })}>{content}</div>
            <div className={'ui-notice-footer'}>
            {rest.onConfirm ?
                <span>
                <Button onClick={rest.onCancel} size={"mini"}>{rest.cancelText}</Button>&nbsp;
                    <Button onClick={rest.onConfirm} size={"mini"} type={"primary"}>{rest.confirmText}</Button>
            </span> : ''}
            </div>
        </span>


    </div>)
}

Notice.defaultProps = {
    closable: false,
    confirmText: '确定',
    cancelText: '取消'
}


const aop = (before: VoidCall, fn?: VoidCall) => {
    return () => {
        before();
        if (fn) {
            fn()
        }
    }
}

const selectStyle = (placement?: NotificationPlacement): React.CSSProperties => {
    if (!placement) {
        return {
            top: '1rem',
            right: '1rem'
        }
    }
    switch (placement) {
        case "bottom-left":
            return {
                bottom: '1rem',
                left: '1rem'
            }
        case "bottom-right":
            return {
                bottom: '1rem',
                right: '1rem'
            }
        case "top-left":
            return {
                top: '1rem',
                left: '1rem'
            }
        default:
            return {
                top: '1rem',
                right: '1rem'
            }
    }
}

const notificationMap = new Map<NotificationPlacement, NotificationInstance>()

const notice = (props: NotificationProps) => {
    const {placement} = props;
    const instance = notificationMap.get(placement as NotificationPlacement);

    const renderNotification = (notification: NotificationInstance) => {
        const {onClose} = props;
        const key = new Date().getTime();
        const {onConfirm, onCancel} = props;
        props.onCancel = aop(() => notification.removeNotice(key), onCancel);
        if (onConfirm) {
            props.onConfirm = aop(() => notification.removeNotice(key), onConfirm);
        }
        notification.notice({
            ...props,
            content: <Notice {...props}/>,
            key,
            onClose: aop(() => notification.removeNotice(key), onClose),
        })
    }

    if (instance) {
        renderNotification(instance);
    } else {
        Notification.newInstance({
            style: selectStyle(placement)
        }, n => {
            notificationMap.set(placement as NotificationPlacement, n)
            renderNotification(n);
        })
    }

}

export default notice;