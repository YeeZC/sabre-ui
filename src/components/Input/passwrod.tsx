import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";
import Icon from "../Icon";
import {Base} from "./base";

export const Password: React.FC<InputPropsBase> = (props) => {
    const {prefix, name, value, placeholder, size, defaultValue, onChange, className, disabled} = props;
    const [inputValue, setValue] = useState<string>(value || defaultValue || '');
    const [focus, setFocus] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (inputRef.current) {
            const {value} = inputRef.current;
            if (value !== inputValue) {
                inputRef.current.value = inputValue
            }
        }
    }, [inputValue])

    return (
        <Base className={classNames('ui-input-password', className)}
              size={size}
              disabled={disabled}
              prefix={prefix}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              style={props.style}
              focus={focus}>
            <input type={show ? 'text' : 'password'}
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
            <span className={'ui-input-view'} onClick={() => {
                setShow(!show)
            }}>
                       {show ? <Icon type={'view-off'}/> : <Icon type={'view'}/>}
                   </span>
        </Base>)
}

Password.displayName = 'Input.Password';
Password.defaultProps = {
    size: "default",
    prefix: <Icon type={'lock'}/>
}