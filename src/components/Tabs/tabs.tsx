import React, {createContext, FunctionComponentElement, PropsWithChildren, useState} from "react";
import classNames from "classnames";
import {Tab, TabProps} from "./tab";

export type TabsType = 'line' | 'card'

export interface TabsProps {
    current?: React.Key;
    type?: TabsType;
    className?: string;
    onSelect?: (key?: React.Key) => void;
    style?: React.CSSProperties;
}

interface TabsCompoundedComponent extends React.FC<TabsProps> {
    Tab: React.FC<TabProps>
}

export const Tabs: TabsCompoundedComponent = ({
                                           current,
                                           type,
                                           className,
                                           onSelect,
                                           children,
                                           style
                                       }) => {
    const classes = classNames('ui-tabs', className, {
        [`ui-tabs-${type}`]: type
    })
    const [active, setActive] = useState(current);
    const [tabs, setTabs] = useState(React.Children.map(children, (child, index) => {
        const element = child as FunctionComponentElement<TabProps>;
        if (element) {
            const {displayName} = element.type;
            if (displayName === 'Tab') {
                const {tabKey} = element.props;
                return tabKey ? element :
                    React.cloneElement(element, {
                        ...element.props,
                        tabKey: index
                    })
            }
        }
    }));


    return (<div>
        <ul className={classes} style={style}>
            {tabs?.map(tab => {
                const {tabKey, disabled, title} = tab.props;
                const classes = classNames('ui-tab', className, {
                    'ui-tab-active': !disabled && tabKey === active,
                    'ui-tab-disabled': !!disabled
                })
                const handleClick = () => {
                    if (!disabled && active !== tabKey) {
                        setActive(tabKey)
                        if (onSelect) {
                            onSelect(tabKey as React.Key)
                        }
                    }
                }
                return (<li className={classes} onClick={handleClick} key={tabKey}>{title}</li>)
            })}
            {type === "card" ? <li className={'ui-tab ui-tab-tail'}/> : ''}
        </ul>
        {tabs?.filter(tab => {
            const {tabKey} = tab.props;
            return tabKey === active
        })}
    </div>)
}

Tabs.defaultProps = {
    current: 0,
    type: "line"
}

Tabs.Tab = Tab;
