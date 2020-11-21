
import React, {ReactElement} from "react";
import classnames from "classnames";

export declare interface ButtonProps {
    type?: ButtonType;
    danger?: boolean;
    className?: string;
    formType?: 'submit' | 'reset' | 'button';
    size?: SizeType;
    shape?: ButtonShape;
    disabled?: boolean;
    icon?: React.ReactNode;
    dashed?: boolean;
    onClick?: () => void;
}

type ButtonShape = 'circle' | 'square'


const Button: React.FC<ButtonProps> = (props) => {
    const {type, icon, className, danger, formType, dashed, size, shape, disabled, children, onClick, ...restProps} = props;
    const classes = classnames('btn', className, {
        [`btn-${type}`]: type,
        [`btn-size-${size}`]: size,
        [`btn-${shape}`]: shape,
        'btn-danger': danger,
        'btn-disabled': disabled,
        'btn-dashed': dashed
    })
    switch (formType) {
        case "reset":
        case "submit":
            return (<button type={formType} className={classes} disabled={disabled} {...restProps}>
                {icon ? <span>{icon}&nbsp;</span> :
                    <span/>}{children}</button> )
        default: {
            const onClickFunc = disabled ? () => {} : onClick;
            return (<span className={classes} onClick={onClickFunc} {...restProps}><span>{icon}&nbsp;{children}</span></span>)
        }
    }
}

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

const BtnGroup: React.FC<{}> = ({children, ...rest}) => {

    const nodes = React.Children.toArray(children).filter(child => {
        return child as ReactElement;
    });

    const length = nodes.length;
    return (<span className={'btn-gp'}>{nodes.map((child, idx) => {
        const element = child as ReactElement;
        const {className} = element.props;
        return React.cloneElement(element, {
            className: classnames(className, {
                'btn-gp-first': idx === 0,
                'btn-gp-last': idx === length-1,
                'btn-gp-mid': idx >0 && idx < length - 1
            })
        })
    })}</span>)
}

export const Group = BtnGroup;

export default Button;