import React from "react";
import classNames from "classnames";

export declare interface ColProps {
    span?: number,
    className?: string,
    style?: React.CSSProperties
}

const Col: React.FC<ColProps> = ({span, className, style, children}) => {
    const handleSpan = () => {
        if (span) {
            return Math.floor(span)
        }
        return 1;
    }
    const result = handleSpan();
    const classes = classNames(className, 'ui-col', {
        [`ui-col-${result}`]: result > 0 && result <= 24,
    })

    return (<div className={classes} style={style}>
        {children}
    </div> )
}

Col.displayName = 'Col';

export default Col;