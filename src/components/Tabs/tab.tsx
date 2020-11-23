import React, {ReactNode} from "react";
import classNames from "classnames";

export interface TabProps {
    tabKey?: React.Key,
    disabled?: boolean;
    title: ReactNode,
    style?: React.CSSProperties;
    className?: string
}

export const Tab: React.FC<TabProps> = (props) => {
    const {className, style} = props;
    const classes = classNames('ui-tab-content', className);
    return (<div className={classes} style={style}>{props.children}</div>)
}

Tab.defaultProps = {
    disabled: false
}

Tab.displayName = "Tab"