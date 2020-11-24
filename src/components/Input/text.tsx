import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";

export const Text:React.FC<InputPropsBase> = (props) =>  {
    const {name, value, placeholder, size, defaultValue, onChange} = props;
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

    return (
        <div className={classNames('ui-input', 'ui-input-text', {
            [`ui-input-${size}`]: size,
            'focus': focus
        })}>
        <input type={'text'}
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
        </div>)
}

Text.displayName = 'Input.Text';
Text.defaultProps = {
    size: "default"
}