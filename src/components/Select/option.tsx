import React, {ReactElement, ReactNode, useContext} from "react";
import {SelectContext} from "./select";
import classNames from "classnames";

export interface OptionProps {
    label: string;
    value: any | any[];
}

export const Option: React.FC<OptionProps & { active?: boolean }> = (props) => {
    const {label, active, value} = props;
    const context = useContext(SelectContext);
    const classes = classNames('ui-option', {
        'active': active
    })

    return (
        <li className={classes} onClick={() => {
            if (context && context.onSelect) {
                context.onSelect(props)
            }}}>
            {context.renderItem ? context.renderItem({label, value}) : label}
        </li>
    )
}

Option.displayName = "Option"