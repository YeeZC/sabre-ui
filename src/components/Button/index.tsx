import React, {MutableRefObject} from 'react';
import {ButtonType, SizeType} from '../../data';
import classnames from 'classnames';

export declare interface ButtonProps {
    type?: ButtonType;
    danger?: boolean;
    className?: string;
    size?: SizeType;
    disabled?: boolean;
    icon?: React.ReactNode,
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {type, icon, className, danger, size, disabled, children, ...restProps} = props;
    const classes = classnames('btn', className, {
        [`btn-${type}`]: type,
        [`btn-${size}`]: size,
        'btn-danger': danger,
        'btn-disabled': disabled
    })
    if (type === 'link') {
        return (<a className={classes} href='#' {...restProps}>{icon ? <span>{icon}&nbsp;</span> : <span/>}{children}</a>)
    }
    return (<button className={classes} {...restProps} disabled={disabled}>{icon ? <span>{icon}&nbsp;</span> :
        <span/>}{children}</button>)
}

Button.defaultProps = {
    danger: false,
    type: 'default',
    disabled: false,
    size: 'default',
    onClick: () => {
    }
}

export default Button;