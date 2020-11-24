import React from "react";
import {InputPropsBase} from "./common";
import {Text} from "./text";
import {Password} from "./passwrod";


interface InputCompoundedComponent extends React.FC<InputPropsBase> {
    Text: React.FC<InputPropsBase>;
    Password: React.FC<InputPropsBase>
}
const Input:InputCompoundedComponent = (props) => {
    return <Text {...props}/>
}

Input.Text = Text;
Input.Password = Password;

export default Input;