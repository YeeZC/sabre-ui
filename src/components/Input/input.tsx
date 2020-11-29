import React from "react";
import {InputPropsBase} from "./common";
import {Text} from "./text";
import {Password} from "./passwrod";
import {Num, NumberProps} from "./number";
import {TextArea, TextAreaProps} from "./textarea";


type InputCompoundedComponent = React.FC<InputPropsBase> & {
    Text: React.FC<InputPropsBase>;
    Password: React.FC<InputPropsBase>;
    Number: React.FC<NumberProps>;
    TextArea: React.FC<TextAreaProps>
}
export const Input:InputCompoundedComponent = (props) => {
    return <Text {...props}/>
}

Input.Text = Text;
Input.Password = Password;
Input.Number = Num;
Input.TextArea = TextArea

Input.defaultProps = {
    size: "default"
}
