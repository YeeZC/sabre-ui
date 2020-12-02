import React, {
    createContext,
    FunctionComponentElement,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import classNames from "classnames";
import {Option, OptionProps} from "./option";
import {BaseFormItemProps, SizeType} from "../../data";
import animation from "../Animation";
import {useClickOutSide} from "../../hooks";
import {Empty} from "../../index";

export interface SelectProps extends BaseFormItemProps {
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
}

interface SelectContextInf {
    onSelect?: (value?: OptionProps) => void;
    renderItem?: (item: OptionProps) => ReactNode;
}

export const SelectContext = createContext<SelectContextInf>({})

const Provider = SelectContext.Provider;

type SelectCompoundedComponent = React.FC<SelectProps> & {
    Option: React.FC<OptionProps>
}

export const Select: SelectCompoundedComponent = (props) => {
    const {className, size, disabled, prefix, multiSelect, onChange, renderItem, style} = props;
    const {defaultValue, options, filterOption} = props;
    const [show, setShow] = useState(false);

    const chooseDefault = () => {
        if (defaultValue) {
            const filter = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
            if (options) {
                return options.filter(item => filter.includes(item.value));
            } else {
                const result: OptionProps[] = [];
                React.Children.forEach(props.children, (child, index) => {
                    const element = child as FunctionComponentElement<OptionProps & { active?: boolean }>;
                    if (element && element.type.displayName === 'Option'
                        && handleFilter(keyword.current, element.props)) {

                        if (filter.includes(element.props.value)) {
                            result.push(element.props);
                        }
                    }
                });
                return result;
            }
        }
        return [];
    }

    const [selected, setSelected] = useState<OptionProps[]>(chooseDefault());
    const keyword = useRef<string>('')
    const selectWrapper = useRef<HTMLDivElement>()

    const classes = classNames('ui-select', className, {
        [`ui-select-${size}`]: size,
        'disabled': disabled
    })

    useEffect(() => {
        if (onChange) {
            onChange(selected.map(item => item.value))
        }
    }, [selected])

    useClickOutSide(selectWrapper, () => {
        setShow(false);
    })

    const context: SelectContextInf = {
        renderItem,
        onSelect: value => {
            if (!!value && selected.filter(item =>
                item.label === value.label).length === 0) {
                if (!!multiSelect) {
                    const result = [];
                    selected.forEach(item => result.push(item));
                    result.push(value);
                    setSelected(result);
                } else {
                    setSelected([value])
                }
            }
            setShow(false)
        }
    }

    const handleFilter = (keyword: string, option: OptionProps) => {
        if (filterOption) {
            return filterOption(keyword, option);
        }
        return option.label.includes(keyword);
    }

    const handleActive = (value: any) => {
        return selected.map(item => item.value).includes(value);
    }

    const renderOption = () => {
        let result: ReactElement[] = [];
        if (options) {
            result = options.filter(item => handleFilter(keyword.current, item))
                .map((item, idx) => {
                    return <Option {...item} key={idx} active={handleActive(item.value)}/>
                })
        } else {
            React.Children.forEach(props.children, (child, index) => {
                const element = child as FunctionComponentElement<OptionProps & { active?: boolean }>;
                if (element && element.type.displayName === 'Option'
                    && handleFilter(keyword.current, element.props)) {
                    result.push(React.cloneElement(element, {
                        key: index,
                        active: handleActive(element.props.value)
                    }))
                }
            });
        }
        if (result.length === 0) {
            return <li className={'empty'}><Empty style={{padding: '1rem 2rem'}}/></li>
        }

        return result;
    }

    const renderSelected = () => {
        if (!!multiSelect) {
            return selected.map((item, idx) => {
                return <span className={'ui-selected-item'} key={idx}>
                    {item.label}
                    <span className={'ui-icon ui-icon-cross'} onClick={() => {
                        const result: OptionProps[] = [];
                        selected.forEach(i => {
                            if (i.value !== item.value) {
                                result.push(i);
                            }
                        })
                        setSelected(result);
                    }}/>
                </span>
            })
        } else if (selected.length > 0) {
            return selected[0].label;
        }
        return '';
    }

    return (
        <div className={'ui-select-wrapper'} ref={ref => {
            if (ref) {
                selectWrapper.current = ref;
            }
        }} onClick={(e) => {
            e.preventDefault();
            setShow(true)
        }} style={style}>
            {prefix ? <span className={'ui-select-prefix'}>{prefix}</span> : ''}
            <div className={classes}>
                {renderSelected()}
            </div>
            <span className={'ui-icon ui-icon-arrow-down'}/>
            {animation.animate(<ul className={'ui-select-dropdown'}>
                <Provider value={context}>
                    {renderOption()}
                </Provider>
            </ul>, {
                show,
                timeout: 300
            })
            }
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