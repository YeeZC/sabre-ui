import React from "react";
import classNames from "classnames";

interface DividerProps {
    type?: Direction;
    size?: SizeType | number;
    dashed?: boolean;
    plan?: boolean;
    placement?: 'left' |'center'| 'right';
}

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
        {children ? <span className={'ui-divider-inner-text'}>{children}</span> : ''}
    </div>)
}
