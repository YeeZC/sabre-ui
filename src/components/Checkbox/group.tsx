import React, {Attributes, createContext, FunctionComponentElement, useState} from "react";
import classNames from "classnames";
import {BaseFormItemProps, SizeType} from "../../data";
import {CheckboxProps} from "./checkbox";

export interface CheckboxGroupProps extends BaseFormItemProps {
    defaultValue?: any[];
    disabled?: boolean;
    size?: SizeType;
    value?: any[];
    onChange?: (value?: any[]) => void
}


interface GroupContextInf {
    onChecked?: (value?: any) => void;
    onRemove?: (value?: any) => void;
    value?: any[]
}

export const GroupContext = createContext<GroupContextInf>({});

export const Group: React.FC<CheckboxGroupProps> = (props) => {
    const {defaultValue, disabled, name, size, onChange, children} = props;
    const [value, setValue] = useState<any[]>(defaultValue || props.value || []);
    const classes = classNames('ui-radio-group', {
        'ui-radio-group-disabled': disabled
    })

    const context: GroupContextInf = {
        onChecked: (v) => {
            const result = value || [];
            if (result.indexOf(v) < 0) {
                result.push(v)
                if (onChange) {
                    onChange(result)
                }
                setValue(result)
            }
        },
        onRemove: (v) => {
            if (v && value) {
                if (value.length === 0) {
                    return
                }
                const result = value.filter(item => item !== v);
                if (onChange) {
                    onChange(result)
                }
                setValue(result)
            }
        },
        value
    }
    const renderContent = () => (React.Children.map(children, (child, index) => {
        const element: FunctionComponentElement<CheckboxProps> = child as FunctionComponentElement<CheckboxProps>;
        if (element) {
            const {displayName} = element.type;
            if (displayName === 'Checkbox') {
                const props: CheckboxProps & Attributes = {
                    ...element.props,
                    name,
                    checked: false,
                    defaultChecked: element.props.defaultChecked || element.props.checked,
                    disabled: disabled || element.props.disabled,
                    key: element.key || index
                }
                return React.cloneElement(element, {
                    ...props
                })
            }
        }
    }));
    return (<div className={classes}>
        <GroupContext.Provider value={context}>
            {renderContent()}
        </GroupContext.Provider>
    </div>)
}

Group.displayName = "Checkbox.Group"