import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import {GroupContext} from "./group";

export interface RadioProps {
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    value: any
}

export const Base: React.FC<RadioProps & {prefixCls: string}> = (props) => {
    const {disabled, defaultChecked, value, children, name, prefixCls} = props;
    const context = useContext(GroupContext);
    const [checked, setChecked] = useState(defaultChecked || props.checked)

    useEffect(() => {
        if (context.value && !disabled) {
            setChecked(context.value === value)
        }
    }, [context.value])
    const wrapper = classNames(`${prefixCls}-wrapper`, {
        [`${prefixCls}-wrapper-checked`]: !disabled && checked,
        'disabled': disabled
    })
    const classes = classNames(prefixCls, {
        [`${prefixCls}-checked`]: !disabled && checked,
        'disabled': disabled
    })

    return (
        <label className={wrapper} onClick={(e: React.MouseEvent) => {
            if (!checked) {
                setChecked(true)
                if (context && context.onChange) {
                    context.onChange(e, value)
                }
                e.stopPropagation()
            }
        }}>
            <span className={classes}>
                <input className={`${prefixCls}-input`} name={name} type={'radio'} disabled={disabled} value={value} checked={checked}/>
                <span className={`${prefixCls}-inner`}/>
            </span>
            <span>{children}</span>
        </label>

    )
}