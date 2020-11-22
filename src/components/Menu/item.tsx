import React, {ReactNode, useContext} from "react";
import classnames from 'classnames';
import {MenuContext} from "./menu";

export interface MenuItemProps {
    itemKey?: React.Key;
    onSelect?: () => void;
    icon?: ReactNode;
    disabled?: boolean;
}

const Item: React.FC<MenuItemProps> = ({itemKey, disabled, onSelect, children}) => {
    const context = useContext(MenuContext);
    const classes = classnames('ui-menu-item', {
        'ui-menu-item-active': context.active === itemKey && !disabled,
        'ui-menu-item-disabled': disabled
    })
    const handleClick = (active: React.Key) => {
        if (!disabled) {
            if (onSelect) {
                onSelect();
            }
            if (context.onActive) {
                context.onActive(active)
            }
        }

    }
    return <li className={classes} onClick={() => handleClick(itemKey as React.Key)}>{children}</li>
}

Item.displayName = "MenuItem";

export default Item;