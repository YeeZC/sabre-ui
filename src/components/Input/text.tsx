import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";
import {Base} from "./base";

export const Text: React.FC<InputPropsBase> = (props) => {
    const {name, value, placeholder, size, defaultValue, onChange, className, prefix, disabled} = props;
    const [inputValue, setValue] = useState<string>(value || defaultValue || '');
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (inputRef.current) {
            const {value} = inputRef.current;
            if (value !== inputValue) {
                inputRef.current.value = inputValue
            }
        }
    }, [inputValue])

    useEffect(() => {
        if (value !== inputValue) {
            setValue(value || '')
        }
    }, [value])

    return (<Base className={classNames('ui-input-text', className)}
                  size={size}
                  disabled={disabled}
                  prefix={prefix}
                  onFocus={props.onFocus}
                  onBlur={props.onBlur}
                  style={props.style}
                  focus={focus}>
            <input type={'text'}
                   disabled={disabled}
                   name={name}
                   ref={(r) => {
                       if (r) {
                           inputRef.current = r;
                       }
                   }}
                   placeholder={placeholder}
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}
                   onChange={event => {
                       setValue(event.target.value);
                       if (onChange) {
                           onChange(event.target.value)
                       }
                   }}/>
        </Base>)
}

Text.displayName = 'Input.Text';
Text.defaultProps = {
    size: "default"
}