import React, {useEffect} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";

export const Base: React.FC<InputPropsBase & {focus?: boolean}> = (props) => {
    const {size, className, prefix, children, focus, disabled, onBlur, onFocus} = props;
    useEffect(() => {
        if (focus&&onFocus) {
            onFocus();
        } else if (!focus && onBlur) {
            onBlur();
        }
    }, [focus])

    return (<div className={classNames('ui-input',
        className, {
            [`ui-input-${size}`]: size,
            'focus': focus,
            'disabled': disabled
        })}>
        {prefix ? <span className={'ui-input-prefix'}>{prefix}</span> : ''}
        {children}
    </div>)
}