import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import {GroupContext} from "./group";
import {BaseFormItemProps} from "../../data";

export interface RadioProps extends BaseFormItemProps {
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    value: any
}

export const Base: React.FC<RadioProps & { prefixCls: string }> = (props) => {
    const {disabled, defaultChecked, value, children, name, prefixCls} = props;
    const context = useContext(GroupContext);
    const [checked, setChecked] = useState(defaultChecked || props.checked)
    useEffect(() => {
        setChecked(defaultChecked || props.checked)
    }, [defaultChecked, props.checked])

    useEffect(() => {
        if (checked && context && context.onChange) {
            context.onChange(value)
        }
    }, [checked])

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
                e.preventDefault();
                setChecked(true)
                e.stopPropagation()
            }
        }}>
            <span className={classes}>
                <input className={`${prefixCls}-input`} name={name} type={'radio'} disabled={disabled} value={value}
                       checked={checked} onChange={() => {
                }}/>
                <span className={`${prefixCls}-inner`}/>
            </span>
            <span>{children}</span>
        </label>

    )
}