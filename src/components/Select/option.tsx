import React, {ReactNode, useContext} from "react";
import {SelectContext} from "./select";

export interface OptionProps {
    label: ReactNode;
    value: any;
}

export const Option: React.FC<OptionProps> = (props) => {
    const {label} = props;
    const context = useContext(SelectContext);
    return <li onClick={() => {
        if (context && context.onSelect) {
            context.onSelect(props)
        }
    }}>{label}</li>
}

Option.displayName = "Option"