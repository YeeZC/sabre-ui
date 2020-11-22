import React, {createContext, FunctionComponentElement, useState} from "react";
import Item, {MenuItemProps} from "./item";
import SubMenu, {SubMenuProps} from "./sub";
import classnames from 'classnames';

interface MenuContextProps {
    active?: React.Key;
    onActive?: (active: React.Key) => void;
    direction?: Direction;
}

export const MenuContext = createContext<MenuContextProps>({})


interface MenuProps {
    direction?: Direction;
    active?: React.Key;
    className?: string;
    style?: React.CSSProperties;
}

interface MenuCompoundedComponent extends React.FC<MenuProps> {
    SubMenu: React.FC<SubMenuProps>,
    Item: React.FC<MenuItemProps>
}

type MenuCC = MenuCompoundedComponent;

const Menu: MenuCC = ({direction, className, active, children, ...rest}) => {
    const [current, setCurrent] = useState(active);


    const context: MenuContextProps = {
        active: current,
        onActive: setCurrent,
        direction
    }

    const classes = classnames('ui-menu', className, {
        [`ui-menu-${direction}`]: direction
    })

    return (
        <ul className={classes} {...rest}>
            <MenuContext.Provider value={context}>
                {React.Children.map(children, ((child, index) => {
                    const element = child as FunctionComponentElement<MenuItemProps| SubMenuProps>;
                    if (element) {
                        const {displayName} = element.type;
                        if (displayName === 'MenuItem' || displayName == 'SubMenu') {
                            return React.cloneElement(element, {
                                ...element.props,
                                itemKey: element.props.itemKey || index
                            })
                        }
                    }
                }))}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    active: '0',
    direction: "horizontal"
}

Menu.Item = Item;
Menu.SubMenu = SubMenu;

export default Menu;