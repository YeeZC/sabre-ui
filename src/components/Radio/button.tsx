import React from "react";
import {RadioProps} from "./radio";
import {Base} from "./base";

export const Button: React.FC<RadioProps> = (props) => {
    return (<Base {...props} prefixCls={'ui-radio-button'}/>)
}

Button.displayName = "Radio.Button"