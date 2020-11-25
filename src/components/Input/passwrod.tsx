import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";
import Icon from "../Icon";

export const Password: React.FC<InputPropsBase> = (props) => {
    const {prefix, name, value, placeholder, size, defaultValue, onChange, className} = props;
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
        <div className={classNames('ui-input',
            'ui-input-password',
            className, {
                [`ui-input-${size}`]: size,
                'focus': focus,
            })}>
            {prefix ? <span className={'ui-input-prefix'}>{prefix}</span> : ''}
            <input type={show ? 'text' : 'password'}
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
        </div>)
}

Password.displayName = 'Input.Password';
Password.defaultProps = {
    size: "default",
    prefix: <Icon type={'lock'}/>
}