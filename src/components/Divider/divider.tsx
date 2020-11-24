import React from "react";
import classNames from "classnames";
import {Direction, SizeType} from "../../data";

export interface DividerProps {
    /** Divider 方向*/
    type?: Direction;
    /** Divider 间隔大小*/
    size?: SizeType | number;
    /**
     * 是否显示虚线
     */
    dashed?: boolean;
    /**
     * Text是否显示为纯文本
     */
    plan?: boolean;
    /** Text 位置*/
    placement?: 'left' |'center'| 'right';
}

/**
 * Test
 * @param props
 * @constructor
 */
export const Divider: React.FC<DividerProps> = (props) => {
    const {type, size, placement, dashed, plan, children} = props;
    const classes = classNames('ui-divider', {
        [`ui-divider-${type}`]: type,
        [`ui-divider-${size}`]: typeof size === "string",
        [`ui-divider-text-${placement}`]: children && placement && placement !== 'center',
        'ui-divider-text': !!children && type === "horizontal",
        'ui-divider-text-plan': !!children && !!plan,
        'ui-divider-dashed': dashed
    })

    const handleStyle = () => {
        if (typeof size === "number") {
            switch (type) {
                case "horizontal":
                    return {
                        margin: `${size}px 0`
                    }
                case "vertical":
                    return {
                        margin: `0 ${size}px`
                    }
            }
        }
        return {}
    }

    return (<div className={classes} style={handleStyle()}>
        {children && type==="horizontal" ? <span className={'ui-divider-inner-text'}>{children}</span> : ''}
    </div>)
}

Divider.displayName = 'Divider';
Divider.defaultProps = {
    type: "horizontal",
    size: "default",
    dashed: false
}