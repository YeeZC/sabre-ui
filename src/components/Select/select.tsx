import React, {createContext, FunctionComponentElement, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";
import {Option, OptionProps} from "./option";
import {SizeType} from "../../data";
import Icon from "../Icon";
import animation from "../Animation";
import {useRenderChildren} from "../../hooks";

export interface SelectProps {
    name?: string;
    prefix?: ReactNode;
    className?: string;
    size?: SizeType;
    disabled?: boolean;
    multiSelect?: boolean;
    onChange?: (value: any[]) => void
}

interface SelectContextInf {
    onSelect?: (value?: OptionProps) => void
}

export const SelectContext = createContext<SelectContextInf>({})

const Provider = SelectContext.Provider;

interface SelectCompoundedComponent extends React.FC<SelectProps> {
    Option: React.FC<OptionProps>
}

export const Select: SelectCompoundedComponent = (props) => {
    const {name, className, size, disabled, prefix, multiSelect, onChange} = props;
    const [focus, setFocus] = useState(false);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<OptionProps[]>([])

    const classes = classNames('ui-select',className, {
        [`ui-select-${size}`]: size,
        'focus': focus,
        'disabled': disabled
    });

    const handleChange = (v: any[]) => {
        if (onChange) {
            onChange(v);
        }
    }

    const context:SelectContextInf = {
        onSelect: (value?: OptionProps) => {
            if (value) {
                if (multiSelect && !selected.includes(value)) {
                    const result = [];
                    selected.forEach(item => result.push(item))
                    result.push(value);
                    setSelected(result)
                } else if (!multiSelect) {
                    setSelected([value])
                }
            }
        }
    }

    useEffect(() => {
        handleChange(selected)
    }, [selected])

    const children = useRenderChildren(props.children, Option.displayName);
    return (
        <div className={'ui-select-wrapper'} style={{width: 300}}>
            <div className={classes} onClick={() => {
                setShow(true)
            }}>
                {prefix ? <span className={'ui-select-prefix'}>{prefix}</span> : ''}
                <select disabled={disabled} name={name}>
                    {React.Children.map(children, (child, index) => {
                        const {props} = (child as FunctionComponentElement<OptionProps>);
                        return <option key={index} value={props.value}>{props.label}</option>
                    })}
                </select>
                {selected.map((item, index) => {
                    return <span key={index} className={'ui-select-item'}>
                        <span>
                            {item.label}
                            <Icon type={'cross'} className={'ui-select-close'} onClick={() => {
                                setSelected(selected.filter(i => i !== item))
                            }}/>
                        </span>
                    </span>
                })}
                {selected.length > 0 ? <Icon type={'close-filled'} className={'ui-select-clear'} onClick={() => {
                    setSelected([])
                }}/> : ''}
                <span className={classNames('ui-select-down', {
                    'active': selected.length <= 0
                })}><Icon type={'arrow-down'}/></span>
            </div>
            {animation.animate(
                <ul>
                    <Provider value={context}>
                        {children}
                    </Provider>
                </ul>, {
                    timeout: 300,
                    show: show
                })}
        </div>
    )
}

Select.defaultProps = {
    size: "default",
    disabled: false,
    multiSelect: true
}

Select.displayName = "Select"

Select.Option = Option;