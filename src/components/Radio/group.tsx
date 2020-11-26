import React, {Attributes, createContext, FunctionComponentElement, useState} from "react";
import classNames from "classnames";
import {SizeType} from "../../data";
import {RadioProps} from "./radio";

export type ButtonStyle = 'outline' | 'filled';

interface GroupContextInf {
    onChange?: (e: React.MouseEvent, value?: any) => void;
    value?: any
}

export const GroupContext = createContext<GroupContextInf>({});

export interface GroupProps {
    buttonStyle?: ButtonStyle;
    defaultValue?: any;
    disabled?: boolean;
    name?: string;
    size?: SizeType;
    value?: any;
    onChange?: (e: React.MouseEvent, value: any) => void
}

export const Group: React.FC<GroupProps> = (props) => {
    const {buttonStyle, defaultValue, disabled, name, size, onChange, children} = props;
    const [value, setValue] = useState<any>(defaultValue || props.value);
    const classes = classNames('ui-radio-group', {
        [`ui-radio-group-${buttonStyle}`]: buttonStyle,
        'ui-radio-group-disabled': disabled
    })
    const context: GroupContextInf = {
        onChange: (e, value) => {
            setValue(value)
            if (onChange) {
                onChange(e, value)
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
                    checked: defaultValue === element.props.value || value === element.props.value,
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