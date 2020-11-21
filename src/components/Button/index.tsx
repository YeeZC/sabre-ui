
import React from "react";
import Group from "./group";
import Btn, {ButtonProps} from "./button";

interface CompoundedComponent extends React.FC<ButtonProps> {
    Group: typeof Group;
}

type CC = CompoundedComponent;

const Button: CC = props => {
    return <Btn {...props}/>
}

Button.Group = Group

export default Button;