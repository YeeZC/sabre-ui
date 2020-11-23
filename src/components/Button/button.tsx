import classnames from "classnames";
import React from "react";

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

type ButtonShape = 'circle' | 'square'

const Btn: React.FC<ButtonProps> = (props) => {
    const {type, icon, className, danger, formType, dashed, size, shape, disabled, children, onClick, ...restProps} = props;
    const classes = classnames('ui-btn', className, {
        [`ui-btn-${type}`]: type,
        [`ui-btn-size-${size}`]: size,
        [`ui-btn-${shape}`]: shape,
        'ui-btn-danger': danger,
        'ui-btn-disabled': disabled,
        'ui-btn-dashed': dashed
    })
    switch (formType) {
        case "reset":
        case "submit":
            return (<button type={formType} className={classes} disabled={disabled} {...restProps}>
                {icon ? <span>{icon}&nbsp;</span> :
                    <span/>}{children}</button> )
        default: {
            const onClickFunc = disabled ? () => {} : onClick;
            return (<span className={classes} onClick={onClickFunc} {...restProps}><span>{icon ? <span>{icon}&nbsp;</span> :
                <span/>}{children}</span></span>)
        }
    }
}

Btn.defaultProps = {
    danger: false,
    type: 'default',
    disabled: false,
    size: 'default',
    shape: 'square',
    formType: 'button',
    onClick: () => {
    }
}

Btn.displayName = "Button"

export default Btn;