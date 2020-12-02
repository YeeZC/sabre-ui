import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import {CheckboxGroupProps, Group, GroupContext} from "./group";
import {BaseFormItemProps} from "../../data";

export interface CheckboxProps extends BaseFormItemProps {
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    value: any;
    onChange?: (checked: boolean) => void
}


type CheckboxCompounded = React.FC<CheckboxProps> & {
    Group: React.FC<CheckboxGroupProps>
}

export const Checkbox: CheckboxCompounded = (props) => {
    const {disabled, defaultChecked, value, children, name, onChange} = props;
    const context = useContext(GroupContext);
    const [checked, setChecked] = useState(defaultChecked || props.checked)
    const [indeterminate, setIndeterminate] = useState(false)

    useEffect(() => {
        setChecked(defaultChecked || props.checked || false)
    }, [defaultChecked])

    useEffect(() => {
        setIndeterminate(props.indeterminate || false)
    }, [props.indeterminate])

    useEffect(() => {
        if (onChange) {
            onChange(checked || false)
        }
        if (checked) {
            if (context.onChecked) {
                context.onChecked(value)
            }
        } else {
            if (context.onRemove) {
                context.onRemove(value)
            }
            setIndeterminate(false)
        }
    }, [checked])

    useEffect(() => {
        if (context.value && !disabled) {
            setChecked(context.value.includes(value))
        }
    }, [context.value])


    const wrapper = classNames(`ui-checkbox-wrapper`, {
        [`ui-checkbox-wrapper-checked`]: !disabled && checked,
        'disabled': disabled
    })
    const classes = classNames('ui-checkbox', {
        [`ui-checkbox-checked`]: !disabled && checked,
        'ui-checkbox-indeterminate': !checked && indeterminate,
        'disabled': disabled
    })

    return (
        <label className={wrapper} onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            const newChecked = !checked;
            setChecked(newChecked)
            e.stopPropagation()
        }}>
            <span className={classes}>
                <input className={`ui-checkbox-input`} name={name} type={'checkbox'}
                       disabled={disabled}
                       value={value}
                       defaultChecked={checked}
                />
                <span className={`ui-checkbox-inner`}/>
            </span>
            <span>{children}</span>
        </label>

    )
}

Checkbox.Group = Group;