import React from "react";
import classNames from "classnames";

interface DividerProps {
    type?: Direction;
    size?: SizeType | number;
}

export const Divider: React.FC<DividerProps> = (props) => {
    const {type, size} = props;
    const classes = classNames('ui-divider', {
        [`ui-divider-${type}`]: type,
        [`ui-divider-${size}`]: typeof size === "string"
    })

    const handleStyle = () => {
        if (typeof size === "number") {
            switch (type) {
                case "horizontal":
                return {
                    margin: `0 ${size}px`
                }
                case "vertical":
                    return {
                        margin: `${size}px 0`
                    }
            }
        }
        return {}
    }

    return (<div className={classes} style={handleStyle()}/>)
}
