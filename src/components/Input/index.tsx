import React from "react";
import {InputPropsBase} from "./common";
import {Text} from "./text";
import {Password} from "./passwrod";
import {Num, NumberProps} from "./number";


interface InputCompoundedComponent extends React.FC<InputPropsBase> {
    Text: React.FC<InputPropsBase>;
    Password: React.FC<InputPropsBase>;
    Number: React.FC<NumberProps>
}
const Input:InputCompoundedComponent = (props) => {
    return <Text {...props}/>
}

Input.Text = Text;
Input.Password = Password;
Input.Number = Num;

export default Input;