import React, {FunctionComponentElement, useContext} from "react";
import classNames from "classnames";
import Tooltip from "../Tooltip";
import {BaseFormItemProps} from "../../data";
import {FormContext} from "./form";

export interface ItemProps {
    name: string;
    label: string;
    tooltip?: string;
}

export const Item: React.FC<ItemProps> = (props) => {
    const {children, label, name, tooltip} = props;
    const number = React.Children.count(children);
    if (number !== 1) {
        throw new Error("need one node");
    }
    const context = useContext(FormContext);
    const {layout} = context;
    const element = React.Children.toArray(children)[0] as FunctionComponentElement<BaseFormItemProps>;
    if (!element) {
        throw new Error("Not a BaseFormItem");
    }

    const classes = classNames('ui-form-item', {
        'ui-form-item-tooltip': !!tooltip,
        [`ui-form-item-${layout}`]: layout
    })

    return (
        <div className={classes}>
            <span className={'ui-form-item-label'} style={layout === "inline" ? {} : {
                width: `${(context.labelCol || 24) / 24.0 * 100}%`
            }}>
                {label}
                {!!tooltip ?
                    <Tooltip placement={layout === "vertical" ? "right" : "top"} tip={tooltip}>
                        <span className={'ui-icon ui-icon-help'}/>
                    </Tooltip> : ''}
            </span>
            <span className={'ui-form-item-wrapper'}>
                {React.cloneElement(element, {
                    name,
                    style: layout === "inline" ? {} : {
                        width: `${(context.wrapperCol || 24) / 24.0 * 100}%`
                    }
                })}
            </span>
        </div>
    )
}