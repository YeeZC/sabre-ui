import classnames from "classnames";
import React from "react";
import {ButtonType, SizeType} from "../../data";
import { Group } from "./group";

export declare interface ButtonProps {
    type?: ButtonType;
    danger?: boolean;
    className?: string;
    formType?: 'submit' | 'reset' | 'button';
    size?: SizeType | 'mini';
    shape?: ButtonShape;
    disabled?: boolean;
    icon?: React.ReactNode;
    dashed?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export type ButtonShape = 'circle' | 'square'

type CompoundedComponent = React.FC<ButtonProps> & {
    Group: typeof Group;
}

export const Button: CompoundedComponent = (props) => {
    const {type, icon, className, danger, formType, dashed, size, shape, disabled, children, onClick, ...restProps} = props;
    const classes = classnames('ui-btn', className, {
        [`ui-btn-${type}`]: type,
        [`ui-btn-size-${size}`]: size,
        [`ui-btn-${shape}`]: shape,
        'ui-btn-danger': danger,
        'ui-btn-disabled': disabled,
        'ui-btn-dashed': dashed
    })
    const onClickFunc = disabled ? (e: React.MouseEvent) => {} : (e: React.MouseEvent) => {
        if (onClick) {
            onClick();
        }
        e.stopPropagation();
    };
    switch (formType) {
        case "reset":
        case "submit":
            return (<button type={formType}
                            className={classes}
                            disabled={disabled}
                            onClick={onClickFunc}
                            {...restProps}>
                {icon ? <span>{icon}&nbsp;</span> :
                    <span/>}{children}</button> )
        default: {

            return (<span className={classes} onClick={onClickFunc} {...restProps}><span>{icon ? <span>{icon}&nbsp;</span> :
                <span/>}{children}</span></span>)
        }
    }
}

Button.Group = Group
Button.displayName = "Button"

Button.defaultProps = {
    danger: false,
    type: 'default',
    disabled: false,
    size: 'default',
    shape: 'square',
    formType: 'button',
    onClick: () => {
    }
}

Button.displayName = "Button"