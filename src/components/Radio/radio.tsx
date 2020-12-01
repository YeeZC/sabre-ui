import React from "react";
import {Group, GroupProps} from "./group";
import {Button} from "./button";
import {Base, RadioProps} from "./base";


export interface RadioCompounded extends React.FC<RadioProps> {
    Button: React.FC<RadioProps>;
    Group: React.FC<GroupProps>;
}

export const Radio: RadioCompounded = (props) => {
    return (<Base {...props} prefixCls={'ui-radio'}/>)
}

Radio.Button = Button;
Radio.Group = Group;

Radio.displayName = "Radio";