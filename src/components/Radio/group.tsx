import React, {Attributes, createContext, FunctionComponentElement, useState} from "react";
import classNames from "classnames";
import {BaseFormItemProps, SizeType} from "../../data";
import {RadioProps} from "./base";

export type ButtonStyle = 'outline' | 'filled';

interface GroupContextInf {
    onChange?: (value?: any) => void;
    value?: any
}

export const GroupContext = createContext<GroupContextInf>({});

export interface GroupProps extends BaseFormItemProps {
    buttonStyle?: ButtonStyle;
    defaultValue?: any;
    disabled?: boolean;
    size?: SizeType;
    value?: any;
    onChange?: (value: any) => void
}

export const Group: React.FC<GroupProps> = (props) => {
    const {buttonStyle, defaultValue, disabled, name, size, onChange, children} = props;
    const [value, setValue] = useState<any>(defaultValue || props.value);
    const classes = classNames('ui-radio-group', {
        [`ui-radio-group-${buttonStyle}`]: buttonStyle,
        'ui-radio-group-disabled': disabled
    })
    const context: GroupContextInf = {
        onChange: (value) => {
            setValue(value)
            if (onChange) {
                onChange(value)
            }
        },
        value
    }
    const renderContent = () => (React.Children.map(children, (child, index) => {
        const element: FunctionComponentElement<RadioProps> = child as FunctionComponentElement<RadioProps>;
        if (element) {
            const {displayName} = element.type;
            if (displayName === 'Radio' || displayName === 'Radio.Button') {
                const props: RadioProps & Attributes = {
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

Group.displayName = "Radio.Group"