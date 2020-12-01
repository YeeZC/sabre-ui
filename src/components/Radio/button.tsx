import React from "react";
import {Base, RadioProps} from "./base";

export const Button: React.FC<RadioProps> = (props) => {
    return (<Base {...props} prefixCls={'ui-radio-button'}/>)
}

Button.displayName = "Radio.Button"