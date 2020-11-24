import React, {useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";

export const Password:React.FC<InputPropsBase> = (props) =>  {
    const {value, placeholder, size} = props;
    const [inputValue, setValue] = useState<string>(value || '');

    return (<input
        className={classNames('ui-input', 'ui-input-password', {
            [`ui-input-${size}`]: size
        })}
        type={'password'}
        value={inputValue}
        placeholder={placeholder}/>)
}

Password.displayName = 'Input.Password';