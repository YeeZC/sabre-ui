import React, {useState} from "react";
import classNames from "classnames";
import {InputPropsBase} from "./common";

export const Text:React.FC<InputPropsBase> = (props) =>  {
    const {value, placeholder, size} = props;
    const [inputValue, setValue] = useState<string>(value || '');

    return (<input
        className={classNames('ui-input', 'ui-input-text', {
            [`ui-input-${size}`]: size
        })}
                   type={'text'}
                   value={inputValue}
                   placeholder={placeholder}/>)
}

Text.displayName = 'Input.Text';
Text.defaultProps = {
    size: "default"
}