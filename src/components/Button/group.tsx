import React from "react";
import classnames from "classnames";
import {ButtonProps} from "./button";

const Group: React.FC<{}> = ({children, ...rest}) => {

    const nodes = React.Children.toArray(children).filter(child => {
        const btn = child as React.FunctionComponentElement<ButtonProps>;
        if (btn && btn.type.displayName === "Button") {
            return btn;
        }
    });

    const length = nodes.length;
    return (<span className={'ui-btn-gp'}>{nodes.map((child, idx) => {
        const element = child as React.FunctionComponentElement<ButtonProps>
        const {className} = element.props;
        return React.cloneElement(element, {
            className: classnames(className, {
                'ui-btn-gp-first': idx === 0,
                'ui-btn-gp-last': idx === length-1,
                'ui-btn-gp-mid': idx >0 && idx < length - 1
            })
        })
    })}</span>)
}

Group.displayName = "BtnGroup"

export default Group;