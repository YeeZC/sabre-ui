import React from "react";
import {ButtonProps} from "./button";
import {SizeType} from "../../data";

export interface GroupProps {
    size?: SizeType | 'mini'
}

export const Group: React.FC<GroupProps> = ({children, ...rest}) => {
    return (<span className={'ui-btn-gp'}>{React.Children.map(children, (child, idx) => {
        const element = child as React.FunctionComponentElement<ButtonProps>
        if (element && element.type.displayName === 'Button') {
            const {size} = element.props;
            const props = {
                ...element.props,
                key: idx
            }
            if (size !== rest.size) {
                props.size = rest.size;
            }

            return React.cloneElement(element, props);
        }

    })}</span>)
}

Group.displayName = "BtnGroup";
Group.defaultProps = {
    size: "default"
}