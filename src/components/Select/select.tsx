import React, {createContext, FunctionComponentElement, ReactNode, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Option, OptionProps} from "./option";
import {SizeType} from "../../data";
import Icon from "../Icon";
import animation from "../Animation";
import {useClickOutSide, useRenderChildren} from "../../hooks";
import {Empty} from "../Empty/empty";

export interface SelectProps {
    prefix?: ReactNode;
    className?: string;
    size?: SizeType;
    disabled?: boolean;
    multiSelect?: boolean;
    defaultValue?: any | any[];
    onChange?: (value: any | any[]) => void;
    options?: OptionProps[];
    renderItem?: (item: OptionProps, key?: React.Key) => ReactNode;
    placeholder?: string;
    filterOption?: (keyword: string, prop: OptionProps) => boolean;
    onSearch?: (keyword: string) => void;
    style?: React.CSSProperties;
}

interface SelectContextInf {
    onSelect?: (value?: OptionProps) => void;
    renderItem?: (item: OptionProps) => ReactNode;
}

export const SelectContext = createContext<SelectContextInf>({})

const Provider = SelectContext.Provider;

interface SelectCompoundedComponent extends React.FC<SelectProps> {
    Option: React.FC<OptionProps>
}

export const Select: SelectCompoundedComponent = (props) => {
    const {className, size, disabled, prefix, multiSelect, onChange, renderItem, style} = props;
    const {defaultValue, options, filterOption} = props;
    const [focus, setFocus] = useState(false);
    const [show, setShow] = useState(false);

    const children = useRenderChildren(props.children, Option.displayName);
    const makeDefaultSelected = () => {
        if (defaultValue) {
            if (options) {
                return options.filter(item => {
                    if (Array.isArray(defaultValue)) {
                        return defaultValue.includes(item.value);
                    } else {
                        return defaultValue === item.value;
                    }
                })
            } else {
                const result: OptionProps[] = [];
                React.Children.map(children, (child, index) => {
                    const element = child as FunctionComponentElement<OptionProps & { active?: boolean }>;
                    const item = element.props;
                    if (Array.isArray(defaultValue)) {
                        if (defaultValue.includes(item.value)) {
                            result.push(item)
                        }
                    } else if (defaultValue === item.value) {
                        result.push(item)
                    }
                });
                return result;
            }
        }
        return [];
    }

    const [selected, setSelected] = useState<OptionProps[]>(makeDefaultSelected());
    const [keyword, setKeyword] = useState<string>('');
    const ref = useRef<HTMLDivElement>();
    const editorRef = useRef<HTMLSpanElement>()
    const handleChange = (v: any[]) => {
        if (onChange) {
            onChange(v);
        }
    }

    const innerFilter = (keyword: string, prop: OptionProps) => {
        if (filterOption) {
            return filterOption(keyword, prop);
        }
        return prop.label.includes(keyword);
    }

    const renderOption = () => {
        let result;
        let length = 0;
        if (options) {
            result = options.filter(item => {
                return innerFilter(keyword, item)
            }).map((item, index) => {
                return <Option key={index} {...item} active={selected.filter(i => i.value === item.value).length > 0}/>
            })
            length = result.length;
        } else {
            result = React.Children.map(children, (child, index) => {
                const element = child as FunctionComponentElement<OptionProps & { active?: boolean }>;
                const {value} = element.props;
                if (innerFilter(keyword, element.props)) {
                    const active = selected.filter(item => item.value === value).length > 0;
                    return React.cloneElement(element, {
                        active
                    })
                }
            })
            length = React.Children.count(result);
        }
        if (length === 0) {
            return <Empty style={{padding: '1rem 2rem'}}/>
        }
        return result;
    }

    useClickOutSide<HTMLDivElement>(ref, () => {
        setShow(false);
        setFocus(false)
    })
    useEffect(() => {
        if (focus && editorRef.current) {
            editorRef.current.focus()
        } else if (editorRef.current) {
            editorRef.current.blur();
        }
    }, [focus])

    const classes = classNames('ui-select', className, {
        [`ui-select-${size}`]: size,
        'focus': focus,
        'disabled': disabled
    });
    useEffect(() => {
        if (!multiSelect && keyword.length <= 0) {
            setSelected([])
        }
        if (props.onSearch) {
            props.onSearch(keyword);
        }
    }, [keyword])

    useEffect(() => {
        handleChange(selected)
    }, [selected])

    const context: SelectContextInf = {
        onSelect: (value?: OptionProps) => {
            if (value) {
                if (multiSelect && !selected.includes(value)) {
                    const result = [];
                    selected.forEach(item => result.push(item))
                    result.push(value);
                    setSelected(result)
                    setKeyword('')
                    if (editorRef.current) {
                        editorRef.current.innerText = ''
                    }
                } else if (!multiSelect) {
                    setSelected([value])
                    if (editorRef.current) {
                        editorRef.current.innerText = value.label
                    }
                }
            }
            setShow(false)
        },
        renderItem
    }



    return (
        <div className={'ui-select-wrapper'} ref={(r) => {
            if (r) {
                ref.current = r;
            }
        }} style={style}>
            <div className={classes} onClick={() => {
                if (!disabled) {
                    setShow(true)
                    if (focus) {
                        if (editorRef.current) {
                            editorRef.current.focus()
                        }
                    } else {
                        setFocus(true);
                    }
                }
            }}>
                {prefix ? <span className={'ui-select-prefix'}>{prefix}</span> : ''}
                {multiSelect ? selected.map((item, index) => {
                    return <span key={index} className={'ui-select-item'}>
                        <span>
                            {item.label}
                            <Icon type={'cross'} className={'ui-select-close'} onClick={() => {
                                setSelected(selected.filter(i => i !== item))
                            }}/>
                        </span>
                    </span>
                }) : ''}
                <span placeholder={props.placeholder}
                      className={'ui-select-item search'}
                      ref={(r) => {
                          if (r) {
                              editorRef.current = r;
                          }
                      }}
                      contentEditable={"true"}
                      onKeyUp={e => {
                          const element = e.target as HTMLSpanElement;
                          setKeyword(element.innerText);
                      }}/>
                {selected.length > 0 ? <Icon type={'close-filled'} className={'ui-select-clear'} onClick={() => {
                    setSelected([])
                    if (editorRef.current) {
                        editorRef.current.innerText = ''
                    }
                }}/> : ''}
                <span className={classNames('ui-select-down', {
                    'active': selected.length <= 0
                })}><Icon type={'arrow-down'}/></span>
            </div>
            {animation.animate(
                <ul>
                    <Provider value={context}>
                        {renderOption()}
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