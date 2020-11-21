import React from "react";
import Icon from "../Icon";
import notice, {NotificationProps} from "./notice";

type RenderFunc = (props: NotificationProps) => void;

interface NotificationApi {
    open: RenderFunc;
    info: RenderFunc;
    success: RenderFunc;
    warn: RenderFunc;
    error: RenderFunc;
    confirm: RenderFunc;
}

const makeDefaultProps = (props: NotificationProps): NotificationProps => {
    return {
        ...props,
        placement: props.placement || "top-right",
        duration: props.closable ? null : props.duration || 2
    }
}

const notification: NotificationApi = {
    open: props => notice(makeDefaultProps(props)),
    info: props => {
        const defaultProps = makeDefaultProps(props);
        notice({
            ...defaultProps,
            icon: defaultProps.icon || <Icon type={"info"} theme={"primary"}/>
        })
    },
    success: props => {
        const defaultProps = makeDefaultProps(props);
        notice({
            ...defaultProps,
            icon: defaultProps.icon || <Icon type={"check"} theme={"success"}/>
        })
    },
    error: props => {
        const defaultProps = makeDefaultProps(props);
        notice({
            ...defaultProps,
            icon: defaultProps.icon || <Icon type={"close"} theme={"danger"}/>
        })
    },
    warn: props => {
        const defaultProps = makeDefaultProps(props);
        notice({
            ...defaultProps,
            icon: defaultProps.icon || <Icon type={"caution"} theme={"warn"}/>
        })
    },
    confirm: props => {
        const defaultProps = makeDefaultProps(props);
        notice({
            ...defaultProps,
            onConfirm: defaultProps.onConfirm || function () {
            }
        })
    }
}

export default notification;