import React, {ReactNode, useContext, useState} from "react";
import classnames from 'classnames';
import {MenuContext} from "./menu";
import {MenuItemProps} from "./item";
import animation from "../Animation";
import Icon from "../Icon";

export declare interface SubMenuProps {
    itemKey?: React.Key;
    icon?: ReactNode;
    title: ReactNode,
    disabled?: boolean;
    style?: React.CSSProperties
}

export const SubMenu: React.FC<SubMenuProps> = ({itemKey,
                                             title,
                                             disabled,
                                             children,
                                             icon,
                                             ...rest}) => {
    const context = useContext(MenuContext);
    const isActive = (itemKey && context.active) ? context.active.toString().startsWith(itemKey.toString())
        : false;
    const classes = classnames('ui-menu-item', 'ui-menu-submenu-item', {
        'ui-menu-item-active': isActive && !disabled,
        'ui-menu-item-disabled': disabled
    })
    const [show, setShow] = useState(false);
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setShow(toggle)
        }, 100)
    }

    const vertical = context.direction === "vertical";
    const hoverShow = vertical ? {} : {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        }
    }

    const clickShow = vertical ? {
        onClick: () => {
            setShow(!show)
        }
    }: {}

    return (<li className={classes} {...hoverShow} {...rest}>
        <div className={'ui-menu-submenu-title'} {...clickShow}>{title}</div>
        {!vertical? <Icon type={'arrow-down'}/>:''}
        {animation.animate((<ul className={classnames('ui-menu-submenu')}>
            {React.Children.map(children, (child, index) => {
                const element = child as React.FunctionComponentElement<SubMenuProps | MenuItemProps>;
                if (element) {
                    const {displayName} = element.type;
                    if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                        return React.cloneElement(element, {
                            ...element.props,
                            itemKey: element.props.itemKey || `${itemKey}-${index}`
                        })
                    }
                }
            })}
        </ul>), {
            show: show,
            timeout: 100,
            type: "zoom-in-top"
        })}

    </li>)
}

SubMenu.displayName = "SubMenu";
