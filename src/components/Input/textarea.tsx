import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";
import {Base} from "./base";

export interface TextAreaProps extends Omit<InputPropsBase, 'prefix'> {
    autoSize?: boolean | number
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
    const {name, value, placeholder, size, defaultValue, onChange, className, autoSize, disabled} = props;
    const [inputValue, setValue] = useState<string>(value || defaultValue || '');
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>();

    useEffect(() => {
        if (inputRef.current) {
            const {value} = inputRef.current;
            if (value !== inputValue) {
                inputRef.current.value = inputValue
            }
        }
    }, [inputValue])
    let rows = undefined;
    if (typeof autoSize === "number") {
        rows = autoSize;
    }
    return <Base focus={focus}
                 disabled={disabled}
                 className={classNames(className, 'ui-input-textarea')}
                 onFocus={props.onFocus}
                 onBlur={props.onBlur}
                 style={props.style}
                 size={size}>
        <textarea
            disabled={disabled}
            ref={(r) => {
                if (r) {
                    inputRef.current = r
                }
            }}
            placeholder={placeholder} name={name}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            rows={rows}
            onChange={event => {
                setValue(event.target.value);
                if (onChange) {
                    onChange(event.target.value)
                }
            }}/>
    </Base>
}

TextArea.displayName = 'TextArea'